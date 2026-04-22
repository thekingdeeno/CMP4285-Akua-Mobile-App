import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './Dashboard';

const DashboardStack = createNativeStackNavigator()

export default function DashboardStackScreen() {
    return (
        <DashboardStack.Navigator
        screenOptions={{headerShown: false}}>
            <DashboardStack.Screen name="DashboardStack" component={Dashboard} />
        </DashboardStack.Navigator>
    );

}