import {url} from "../environment.ts";

export const getEventos = async() => {
    try {
        const response = await fetch(url+'/events');
        
        const data = await response.json();
        return data;
    }catch(error) {
        console.log(error);
    }
}

export const createEvent = async (event: any) => {
    try {
        const response = await fetch(url + '/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateEvent = async (event: any, uuid_evento: string) => {
    try {
        const response = await fetch(url + '/events/' + uuid_evento, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const deleteEvent = async (uuid_evento: string) => {
    try {
        const response = await fetch(url + '/events/' + uuid_evento, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(event),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const addEventUser = async (uuid_evento: string, uuid_user: string) => {
    try {
        const response = await fetch(url + '/events/' + uuid_evento + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ event_id: uuid_evento, user_id: uuid_user }),
     
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const removeEventUser = async (uuid_evento: string, uuid_user: string) => {
    try {
        const response = await fetch(url + '/events/' + uuid_evento + '/unregister' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ event_id: uuid_evento, user_id: uuid_user }),
     
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getUsersForEvent = async (uuid_evento: string) => {
    try {
        const response = await fetch(url + '/events/' + uuid_evento + '/users', {
            method: 'GET',
            headers: {
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
