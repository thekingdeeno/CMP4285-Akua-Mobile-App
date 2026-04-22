import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AuthNavigation from "./Stacks/AuthStack";
import MainNavigation from "./Home";
import { useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { localStorage } from "@/utils/localstorage";

const Stack = createNativeStackNavigator();

const loggedIn = localStorage.getString('currentUser')

const Navigation = () => {
    useEffect(()=>{
    },[loggedIn])
    return(
            <Stack.Navigator 
            initialRouteName={loggedIn ? 'Main' : 'Auth'}
            screenOptions={{headerShown: false}}
            
            >
                <Stack.Screen name="Auth" component={AuthNavigation} />
                <Stack.Screen name="Main" component={MainNavigation} />
                
            </Stack.Navigator>
    );
};

export default Navigation;