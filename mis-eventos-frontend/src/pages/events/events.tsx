import { Spin } from "antd";
import SideModal from "../../components/SideModal";
import useEvent from "../../hooks/eventHook";
import FormEvents from "./formEvents";
import Cards from "../../components/card";

export const Events = () => {
    const events = useEvent().event;
    const loading = useEvent().loading
    return (
        <>  {loading
                ? <Spin />
                :<div className="body-events">{events?.map((event: any) => { return <Cards data={event} /> })}</div>
            }
            
            <SideModal title="Agregar Evento" children={<FormEvents  />}/>
        </>
    );
}

