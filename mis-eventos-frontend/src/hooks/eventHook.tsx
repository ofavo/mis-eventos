import {useEffect, useState} from "react";
import {getEventos} from "../services/events.ts";
import useUserStore from "./store.tsx";

const useEvent = () => {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const refresh = useUserStore((state: any) => state.refreshView);
    const getEvent = async () => {
        setLoading(true);
        try {
            const data = await getEventos();
            setEvent(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }
    useEffect(() => {
        getEvent()
    }, [refresh]);
    return {event, setEvent, loading, setLoading};
}
export default useEvent;