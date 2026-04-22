import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Signup from './Signup';
import { localStorage } from '@/utils/localstorage';

const AuthStack = createNativeStackNavigator();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}