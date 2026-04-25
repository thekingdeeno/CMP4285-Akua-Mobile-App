import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
    screenOptions={{headerShown: false}}>    
      <ProfileStack.Screen name="ProfileStack" component={Profile} />
    </ProfileStack.Navigator>
  );
}