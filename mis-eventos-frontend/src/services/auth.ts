import {url} from "../environment.ts";
import { RegisterInterface } from "../interfaces/register.ts";

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(url+'/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        return data;
    }catch(error) {
        console.log(error);
    }
}

export const register = async ({env}: {env: RegisterInterface}) => {
    try {
        const response = await fetch(url+'/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( env ),
        });
        
        const data = await response.json();
        return data;
    }catch(error) {
        console.log(error);
    }
}