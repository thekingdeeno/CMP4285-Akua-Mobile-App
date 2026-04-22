import { useState } from "react";
import { httpClient } from "@/api/http";
import { localStorage } from "@/utils/localstorage";

const useUser = () => {

    const [isLoading, setIsLoading] = useState(true);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);
            const response: any = await httpClient.post('/user/login', { email, password });
            
            if (response.data.status === true) {
                localStorage.set('currentUser', JSON.stringify(response.data.data));
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

    return {
        login,
        isLoading,
    }


}


export default useUser;