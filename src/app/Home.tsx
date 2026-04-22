import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardStackScreen from './Stacks/DashboardStack';
import DeviceStackScreen from './Stacks/DeviceStack';
import ProfileStackScreen from './Stacks/ProfileStack';

const MainStack = createNativeStackNavigator()

export default function MainNavigation() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>

    // <MainStack.Navigator
    // screenOptions={{headerShown: false}}
    // >
    //   <MainStack.Screen name="Dashboard" component={DashboardStackScreen} />
    //   <MainStack.Screen name="Device" component={DeviceStackScreen}/>
    //   <MainStack.Screen name="Profile" component={ProfileStackScreen}/>
    // </MainStack.Navigator>
  )
}
