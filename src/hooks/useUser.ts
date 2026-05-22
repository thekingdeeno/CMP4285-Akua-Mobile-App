import { httpClient } from "@/api/http";
import { mmkvStorage } from "@/utils/mmkv-storage";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';


const useUser = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<any>();

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response: any = await httpClient.post('/user/login', { email, password });
            
            if (response.data.status === true) {
                mmkvStorage.set('currentUser', JSON.stringify(response.data.data));
            }
            
            return response.data;
        } catch (error) {
            const err: any = error;
            return{
                status: false,
                message: err
            }
        } finally {
           setIsLoading(false);
        }
    }

    const logout = async ()=>{
        mmkvStorage.remove("currentUser")
        navigation.replace("Auth")
    }

    return {
        login,
        isLoading,
        logout
    }

}


export default useUser;