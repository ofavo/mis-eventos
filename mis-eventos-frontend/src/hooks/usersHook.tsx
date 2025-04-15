import { useEffect, useState } from "react";
import { getUsers } from "../services/users";
import useUserStore from "./store";

const useUsers = () => {
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const refresh = useUserStore((state: any) => state.refreshView);

    const getData = async() =>{
        setLoading(true)
        try{
            const data = await getUsers()
          
            setUsers(data)
        }catch(error: any){
            setError(error);
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        getData();
    }, [refresh]);

    return { users, loading, error };
};

export default useUsers;