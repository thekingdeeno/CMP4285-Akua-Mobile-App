import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Device from './Device';

const DeviceStack = createNativeStackNavigator();

export default function DeviceStackScreen() {
  return (
    <DeviceStack.Navigator
    screenOptions={{headerShown: false}}
    >
      <DeviceStack.Screen name="DeviceStack" component={Device} />
    </DeviceStack.Navigator>
  );
}