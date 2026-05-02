import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Device from './Device';
import DeviceConnect from './DeviceConnect';

const DeviceStack = createNativeStackNavigator();

export default function DeviceStackScreen() {
  return (
    <DeviceStack.Navigator
    screenOptions={{headerShown: false}}
    >
      <DeviceStack.Screen name="DeviceStack" component={Device} />
      <DeviceStack.Screen name="DeviceConnect" component={DeviceConnect} />
    </DeviceStack.Navigator>
  );
}