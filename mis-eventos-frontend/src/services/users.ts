import { url } from "../environment";
import { User } from "../pages/users/formUsers";

export const getUsers = async () => {
    try {
        const response = await fetch(url + '/users', {  headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
   

export const createUser = async (user: User) => {
    try {
        const response = await fetch(url + '/users', {
            method: 'POST',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUser = async (uuid: string) => {
    try {
        const response = await fetch(url + '/users/' + uuid, {
            method: 'DELETE',
            headers:  {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}