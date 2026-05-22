import { mmkvStorage } from "@/utils/mmkv-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import MainNavigation from "./Home";
import AuthNavigation from "./Stacks/AuthStack";

const Stack = createNativeStackNavigator();

const loggedIn = mmkvStorage.getString('currentUser')

console.log(loggedIn);


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