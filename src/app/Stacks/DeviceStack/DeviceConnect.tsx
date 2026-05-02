import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { BluetoothPermissions } from '@/api/DevicePermission';

const bleManager = new BleManager();

export default function DeviceConnect() {
    const [scanning, setScanning]   = useState(false);
    const [devices, setDevices]     = useState<Device[]>([]);
    const [connecting, setConnecting] = useState<string | null>(null);

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
        setDevices([]);
        setScanning(true);

        bleManager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setScanning(false);
                return;
            }

            if (device && device.name) {
                setDevices(prev => {
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

            console.log('Connected to:', connected.name);

            // navigation.navigate();

        } catch (error) {
            console.error('Connection failed:', error);
            setConnecting(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Link a Device</Text>
            <Text style={styles.subtitle}>
                Make sure your Aqua Sensor is powered on and nearby
            </Text>

            <TouchableOpacity
                style={[styles.scanBtn, scanning && { opacity: 0.6 }]}
                onPress={startScan}
                disabled={scanning}
            >
                {scanning
                    ? <ActivityIndicator color="white" />
                    : <Text style={styles.scanBtnText}>Scan for Devices</Text>
                }
            </TouchableOpacity>

            {devices.length === 0 && !scanning && (
                <Text style={styles.empty}>No devices found. Try scanning again.</Text>
            )}

            <FlatList
                data={devices}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'grey',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 20,
    },
    scanBtn: {
        backgroundColor: '#3D72FA',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    scanBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
    },
    empty: {
        textAlign: 'center',
        color: 'grey',
        marginTop: 20,
    },
    deviceCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    deviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: 'grey',
    },
    deviceId: {
        fontSize: 14,
        color: 'grey',
        marginTop: 2,
    },
    arrow: {
        fontSize: 22,
        color: 'grey',
    },
});