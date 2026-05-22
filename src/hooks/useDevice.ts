import { useState } from 'react';
import { Alert } from 'react-native';
import { httpClient } from '../api/http';
import { BleManager, Device } from 'react-native-ble-plx';
import { Buffer } from 'buffer';
import { mmkvStorage } from '@/utils/mmkv-storage';

const useDevice = () => {
    const [readings, setReadings] = useState<{name: string, value: string, status: string, color?:string}[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [metricsIndex, setMetricsIndex] = useState<{name: string, percent: number, value: number}[]>([]);
    const [BTdevice, setBTdevice] = useState<Device | null>(null);
    const [BTscanList, setBTscanList] = useState<Device[]>([]);
    const [scanning, setScanning] = useState(false);
    const [espWifiStatus, setEspWifiStatus] = useState<boolean>(false)
    const bleManager = new BleManager();

    // const bleManager = new BleManager();

    const getReadings_db = async (deviceId: string | number) => {
        try {
            setIsLoading(true);
            console.log("In db readings block");
            
            const response = await httpClient.get(`/hardware/fetch-readings/${deviceId}`);

            const { data } = response;
            
            if (data.status === true) {
                const metric = data.data;
                formatResponse(metric);
            }
        } catch (error) {
            console.log('Error fetching last saved readings:', error);
            Alert.alert('Error', 'Failed to fetch last saved readings.');
        } finally {
            setIsLoading(false);
        };
    };

    const registerDevice = async(userId: string, hardwareId: string)=>{
        try {
            console.log("useDevice-registerDevice ===>", userId, hardwareId);
            
            const response: any = await httpClient.post('/hardware/add-device', {
                userId,
                hardwareId
            });
            
            const { data } = response;
            console.log(data);
            
            if(!data.status){
                Alert.alert('Success', 'Device registered successfully!');
            }
            return data;
        } catch (error: any) {
            Alert.alert('Error', 'An error occurred while registering the device.');
            return {
                status: false,
                message: error.message || 'Unable to register device to the server'
            }
        }
    }

    const attemptRecconnect = async () => {
        try {
            const mmkdDevice = mmkvStorage.getString('pairedDevice')

            console.log('starting recoonect');

            const connectedDevices = await bleManager.connectedDevices([process.env.EXPO_PUBLIC_DEVICE_BT_SERVICE!]);
            
            const alreadyConnected = connectedDevices.find(d => d.id === JSON.parse(mmkdDevice!).uniqueId);
            
            console.log({connectedDevices});

            if (alreadyConnected) {
                console.log("Already connected to known device.");
                setBTdevice(alreadyConnected);
                return;
            }

            if (BTdevice !== null) {
                console.log("SKIP SKAN");
                
                return false
            }
            
        bleManager.startDeviceScan(null, null, async (error, device) => {
            if (error) {
                console.error(error);
                return;
            }

            console.log("reconnect - ble starts");
            
            

            if (!mmkdDevice) {
                console.log("No MMKV DEVICE");
                
                return false
            }

            if (device && device.name) {
                setBTscanList(prev => {
                    const exists = prev.find(d => d.id === device.id);
                    if (exists) return prev; 
                    return [...prev, device];
                });
                
                console.log({device: device.id, pair: JSON.parse(mmkdDevice).uniqueId});
                if (device.id === JSON.parse(mmkdDevice).uniqueId) {
                    const isConnected = await device.isConnected();
                    console.log({foundDevice: device});
                    
                    if (isConnected) {
                        console.log("ALREDY CONNECTED");
                        bleManager.stopDeviceScan();
                        return
                    }else{
                        console.log("NOT CNECTED");
                        await bleManager.stopDeviceScan();
                        const cnectDEv = await device.connect()
                        if (cnectDEv) {
                            console.log({NowConected: cnectDEv});
                            
                        }
                    }

                    
                    
                    console.log("RECCONNECT SUCCESS");
                    setBTdevice(device)
                    return {status: true}
                }
            }
        });

        setTimeout(() => {
            bleManager.stopDeviceScan();
            setScanning(false);
        }, 3000);
        } catch (error: any) {
            console.log("EERROR", error);
            bleManager.stopDeviceScan();
            return {
                status: false,
                message: 'unable to connect via bluetooth'
            }
        }
    }

    const getReadings_bt = async () => {
            try {

                if (!BTdevice) {
                    return {status: false, message: 'Not connected'}
                }

                console.log("FEcthing via bt");
                

                console.log({BTdevice});
                

                const isConnected = await BTdevice.isConnected()
                console.log({readIsConnected: isConnected});
                if (!isConnected) {
                    
                    await BTdevice?.connect();
                }
                
                // const services = await BTdevice?.services();
                // console.log('Services:', services);
                // const stop = true
                // if (stop) {
                    //     console.log("FORCE STOP");
                    
                    //     return
                    // }
                    
                const discChars = await BTdevice?.discoverAllServicesAndCharacteristics();
                console.log({discChars});

                const pairKey = JSON.parse(mmkvStorage.getString('pairedDevice')!).key;
                
                const encoded = await BTdevice?.writeCharacteristicWithResponseForService(
                    process.env.EXPO_PUBLIC_DEVICE_BT_SERVICE!,
                    process.env.EXPO_PUBLIC_READINGS_CHAR!,
                    Buffer.from(pairKey).toString('base64')
                ).then(async ()=>{
                    const readings = await BTdevice.readCharacteristicForService(
                        process.env.EXPO_PUBLIC_DEVICE_BT_SERVICE!,
                        process.env.EXPO_PUBLIC_READINGS_CHAR!,
                    );

                    console.log({readings});
                    

                    const decoded = Buffer.from(readings.value as string, 'base64').toString('utf-8');
                    const metricArr = decoded.split("::")

                    console.log({decoded, metricArr});
                    

                    let metric: any = {}

                    for (let i = 0; i < metricArr.length; i++) {
                        const data = metricArr[i].split("=");
                        metric[data[0]] = Number(data[1])
                    }

                    console.log({metric});
                    formatResponse(metric);
                    })
                


            } catch (error: any) {
                console.log('Error fetching real-time readings:', error);
                Alert.alert('Error', 'Failed to fetch real-time readings.');
            }
    } 


    const formatResponse = (metric: any)=>{
                const metrics = [
                    { name: 'pH Level', value: metric.ph, status: 
                        metric.ph < 6.5 && 'Acidic' || 
                        metric.ph > 8.5 && 'Alkaline' || 
                        'Safe',
                        color: metric.ph < 6.5 || metric.ph > 8.5 ? 'red' : 'green'
                    },
                    { name: 'Turbidity', value: `${metric.turb} NTU`, status: 
                        metric.turb <= 1 && 'Perfect' ||
                        metric.turb > 1 && metric.turb <= 3  && 'Clean' ||
                        metric.turb > 3 && metric.turb <= 5 && ' Cloudy' || 
                        'Risky',
                        color: metric.turb > 5 ? 'red' : 'green'
                     },
                     { name: 'TDS', value: metric.tds, status:
                        metric.tds <= 50 && 'Demineralised' || 
                        metric.tds > 50 && metric.tds <= 150 && 'Ideal' ||
                        metric.tds > 300 && metric.tds <= 600 && 'Fair' ||
                        metric.tds > 600 && metric.tds <= 900 && 'Poor' ||
                        metric.tds > 900 && metric.tds <= 1200 && 'Unacceptable' ||
                         'Unsafe',
                        color: metric.tds > 600 ? 'red' : 'green'
                     },
                    { name: 'Temperature', value: metric.temp, status: '' },
                ];

                setMetricsIndex([
                    {name: 'Ph', percent: (metrics[0].value / 14) * 100 , value: metrics[0].value},
                    {name: 'TDS', percent: (metrics[2].value / 900) * 100, value: metrics[2].value},
                    {name: 'Turbidity', percent: (metrics[1].value / 7) * 100, value: metrics[1].value},
                ]);
                setReadings(metrics);
    }

    return {
        getReadings_db,
        readings,
        isLoading,
        metricsIndex,
        registerDevice,
        setBTdevice,
        getReadings_bt,
        BTdevice,
        attemptRecconnect,
        BTscanList, 
        setBTscanList,
        scanning,
        setScanning,
        espWifiStatus,
        setEspWifiStatus
    }
}

export default useDevice;