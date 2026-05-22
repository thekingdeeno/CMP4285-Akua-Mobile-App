import { BluetoothPermissions } from '@/api/DevicePermission';
import useDevice from '@/hooks/useDevice';
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import styles from './Device.style';
import { mmkvStorage } from '@/utils/mmkv-storage';


const bleManager = new BleManager();

export default function DeviceConnect() {

    // const [devices, setDevices]     = useState<Device[]>([]);
    const [connecting, setConnecting] = useState<string | null>(null);
    const navigation = useNavigation<any>();

    const { registerDevice, setBTdevice, BTscanList, setBTscanList, scanning, setScanning} = useDevice();

    useEffect(() => {
        return () => {
            bleManager.stopDeviceScan();
        };
    }, []);

    const startScan = () => {
        const request = BluetoothPermissions();
        if (!request) {
            alert('Bluetooth permission is required to scan for devices.');
            return;
        }
        setBTscanList([]);
        setScanning(true);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setScanning(false);
                return;
            }

            if (device && device.name) {
                setBTscanList(prev => {
                    const exists = prev.find(d => d.id === device.id);
                    if (exists) return prev; 
                    return [...prev, device];
                });
            }
        });

        setTimeout(() => {
            bleManager.stopDeviceScan();
            setScanning(false);
        }, 10000);
    };

    const connectToDevice = async (device: Device) => {
        try {
            setConnecting(device.id);
            bleManager.stopDeviceScan();

            const connected = await device.connect();
            await connected.discoverAllServicesAndCharacteristics();

            if(!device){
                return false
            }

            if (!device.serviceUUIDs){
                return false
            }

            const pairData = {
                uniqueId: device.id,
                name: device.name,
                serviceUUID: device.serviceUUIDs[0],
                key: String(Math.floor(Math.random() * 1000000))
            }

            console.log('Connected to:', connected.name);

            const pairKey = Buffer.from(pairData.key).toString('base64');

            await device.writeCharacteristicWithResponseForService(
                device.serviceUUIDs[0],
                process.env.EXPO_PUBLIC_BT_CONNECTION_CHAR!,
                pairKey
            )
            .then(async (data: any) => {
                const confirmation = await device.readCharacteristicForService(
                    pairData.serviceUUID,
                    process.env.EXPO_PUBLIC_BT_CONNECTION_CHAR!
                );
                
                const decoded = Buffer.from(confirmation.value as string, 'base64').toString('utf-8');
                const response = decoded.split('::');

                console.log(response);
                
                
                if(response[0] === 'SUCCESS'){
                    mmkvStorage.set('pairedDevice', JSON.stringify(pairData));

                    const currentUser = mmkvStorage.getString('currentUser');
                    if (currentUser) {
                        console.log("In register block");
                        
                        const user = JSON.parse(currentUser).user_id

                        const regDevice = await registerDevice(user, device.id);

                        console.log({user, regDevice});
                        
                    } else {
                        console.log("No user in localstorage");
                        
                    }

                    setBTdevice(device);
                    
                    alert('Device paired successfully!');
                    navigation.navigate('Dashboard')
                }else{
                    alert('Failed to pair device. Please try again.');
                }
            })
            .catch(error => {
                console.error('Write characteristic error:', error)
            })

        } catch (error) {
            console.error('Connection failed:', error);
        } finally {
            setConnecting(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{color: 'white', fontSize: 25, fontWeight:'bold'}}>Link a Device</Text>
            <Text style={{color: '#585F7C', fontSize: 15, marginBottom: 20}}>
                Make sure your Aqua Sensor is powered on and nearby
            </Text>

            <TouchableOpacity
                style={[{ backgroundColor: '#1A2540', borderRadius: 10, marginVertical: 10, marginBottom: 20 }, scanning && { opacity: 0.6 }]}
                onPress={startScan}
                disabled={scanning}
            >
                {scanning
                    ? <ActivityIndicator color="#3D72FA" style={styles.bottomButtonStyle}/>
                    : <Text style={{...styles.bottomButtonStyle ,backgroundColor: '#1A2540', color: '#3D72FA'}}>Scan for Devices</Text>
                }
            </TouchableOpacity>

            {BTscanList.length === 0 && !scanning && (
                <Text style={{
                    textAlign: 'center',
                    color: 'grey',
                    marginTop: 20,
             }}>No devices found. Try scanning again.</Text>
            )}

            <FlatList
                data={BTscanList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.deviceCard}
                        onPress={() => connectToDevice(item)}
                        disabled={!!connecting}
                    >
                        <View>
                            <Text style={styles.deviceName}>
                                {item.name ?? 'Unknown Device'}
                            </Text>
                            <Text style={styles.deviceId}>{item.id}</Text>
                        </View>
                        {connecting === item.id
                            ? <ActivityIndicator color={'#3D72FA'} />
                            : <Text style={styles.arrow}>›</Text>
                        }
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}