import DashboardStackScreen from '@/app/Stacks/DashboardStack';
import DeviceStackScreen from '@/app/Stacks/DeviceStack';
import ProfileStackScreen from '@/app/Stacks/ProfileStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Feather } from  '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
          screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: 'google-analytics' | 'router-wireless-settings' | 'user' = 'google-analytics'

          if (route.name === 'Dashboard') {
            iconName = focused
              ? 'google-analytics'
              : 'google-analytics';
          } 
          else if (route.name === 'Device') {
            iconName = focused ? 'router-wireless-settings' : 'router-wireless-settings';
          }else if (route.name === 'Profile'){
            iconName = focused ? 'user' : 'user';
          }

          if (iconName === 'user') {
             return <Feather name={`${iconName}`} size={size} color={color} />;
          }
          return <MaterialCommunityIcons name={`${iconName}`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3A6EF0',
        tabBarInactiveTintColor: '#596280',
        headerShown: false,
        tabBarStyle: {backgroundColor: '#161B26'},
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStackScreen} />
      <Tab.Screen name="Device" component={DeviceStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>

  );
}
