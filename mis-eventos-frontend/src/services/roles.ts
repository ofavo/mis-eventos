import { url } from "../environment";

const heades = {

    'Accept': 'application/json',
    'Content-Type': 'application/json',
  "Authorization": `Bearer ${localStorage.getItem('token')}`
}
export const  getRoles = async() => {
    try {
        const response = await fetch(url+'/roles',{headers:heades});
        
        const data = await response.json();
      
        return data;
    }catch(error) {
        console.log(error);
    }
}
