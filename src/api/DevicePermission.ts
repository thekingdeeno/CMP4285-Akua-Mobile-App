import { PermissionsAndroid, Platform } from 'react-native';
import * as ExpoDevice from 'expo-device';

export const BluetoothPermissions = async () => {
    if (Platform.OS === 'ios') {
        // i dont know how to set up ios yet
        return true;
    }

    if (Platform.OS === 'android') {
        if ((ExpoDevice.platformApiLevel ?? -1) >= 31) {
            const result = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);
            return (
                result['android.permission.BLUETOOTH_SCAN'] === 'granted' &&
                result['android.permission.BLUETOOTH_CONNECT'] === 'granted'
            );
        } else {
            const result = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return result === 'granted';
        }
    }
};