import { useEffect, useState } from "react";
import { getRoles } from "../services/roles";

const useRoles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getData = async() =>{
        setLoading(true)
        try{
           const data = await getRoles()
         
           setRoles(data)
        }catch(error: any){
            setError(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return { roles, loading, error };
};

export default useRoles;
