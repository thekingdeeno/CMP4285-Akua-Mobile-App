import DashboardStackScreen from '@/app/Stacks/DashboardStack';
import DeviceStackScreen from '@/app/Stacks/DeviceStack';
import ProfileStackScreen from '@/app/Stacks/ProfileStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false } }
    >
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Device" component={DeviceStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>

  );
}
