import { Card, Button } from 'antd';
import useUserStore from '../hooks/store';
import { addEventUser, deleteEvent, getUsersForEvent, removeEventUser } from '../services/events';
import UserAssignmentModal from '../components/UserAssignmentModal';
import { useState, useEffect } from 'react';
import {DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
const { Meta } = Card;

const Cards = ({data}: any) => {
    const toggleModal = useUserStore((state: any) => state.toggleModalVisible);
    const setRefresh = useUserStore((state: any) => state.toggleRefreshView);
    const setEventData = useUserStore((state: any) => state.setEventData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [usersOnEvent, setUsersOnEvent] = useState<string[]>([]);

    const userId = useUserStore((state: any) => state.userProfile);

    useEffect(() => {
      getUsersForthisevent(data.uuid_evento);
    }, [data.uuid_evento, userId]);
  const getUsersForthisevent = async (uuid_evento: string) => {
    try {
      const response = await getUsersForEvent(uuid_evento);
      console.log("Usuarios en el evento:", response); // Verificar el contenido
      setUsersOnEvent(response);
    } catch (error) {
      console.log(error);
    }
  }
    const shuffleImages = () => {
      return Math.floor(Math.random() * 7) + 1;
    };

    const handleUpdate = async () => {
      try {
        setEventData(data);  // Guardar datos del evento en el estado global
        toggleModal(true);  // Abrir el SideModal
      } catch (error) {
        console.error('Error al actualizar el evento:', error);
      }
    };

    const handleDelete = async () => {
      try {
        const response = await deleteEvent(data.uuid_evento);
        console.log('Evento eliminado:', response);
        setRefresh(Math.random().toString());
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
      }
    };

    const handleAssignUsers = () => {
      setIsModalVisible(true);
    };

    const handleAssign = (selectedUsers: string[]) => {
      console.log('Usuarios asignados:', selectedUsers);
      setIsModalVisible(false);
    };

    const handleRegister = async () => {
      let env = {
         event_id: data.uuid_evento,
         user_id: userId,
       }
   
       try {
         if (usersOnEvent.map((user: any) => user.uuid_user).includes(userId)) {
           await removeEventUser(env.event_id, env.user_id);
         } else {
          const response = await addEventUser(env.event_id, env.user_id);
          console.log('Usuario inscrito:', response);
          if (response.detail) {
           alert(response.detail);
           return;
          }
         
   
         }
         setRefresh(Math.random().toString());
       } catch (error) {
         console.log(error);
       }
    };

    return (  
    <>
    <Card
        hoverable
        style={{ width: "100%", maxWidth: "300px", margin: "0 auto" }}
        cover={<img alt="example" src={`/src/assets/evento${shuffleImages()}.jpg`} />}
    >
        <Meta 
          title={data.title} 
          description={
            <div>
              <p>Dirección: {data.direccion}</p>
              <p>Fecha de Inicio: {new Date(data.start_date).toLocaleDateString()}</p>
              <p>Fecha de Fin: {new Date(data.end_date).toLocaleDateString()}</p>
              <p>Asistentes: {data.numero_asistentes}</p>
              {localStorage.getItem('role') === 'dashboard' ? (
                <div>
                
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="primary" danger onClick={handleDelete}>
                      <DeleteOutlined />
                    </Button>
                    <Button type="primary" onClick={handleUpdate}>
                      <EditOutlined />
                    </Button>
                    <Button type="primary" onClick={handleAssignUsers}>
                      <UserOutlined />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {usersOnEvent.map((user: any) => user.uuid_user).includes(userId) ? 
                  <Button type="primary" onClick={handleRegister}>Desinscibirse</Button>
                  :  <Button type="primary" onClick={handleRegister}>Inscribirse</Button>}
                 
                </div>
              )}
            </div>
          } 
        />
    </Card> 
    <UserAssignmentModal
      eventId={data.uuid_evento}
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      onAssign={handleAssign}
    />
    </>)
};

export default Cards;