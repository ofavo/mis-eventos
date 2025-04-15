import React, { useEffect, useState } from 'react';
import { Modal, Table, Checkbox, Button } from 'antd';
import useUsers from '../hooks/usersHook';
import { addEventUser, getUsersForEvent, removeEventUser } from '../services/events';

interface UserAssignmentModalProps {
  visible: boolean;
  onClose: () => void;
  onAssign: (selectedUsers: string[]) => void;
  eventId: string;
}

const UserAssignmentModal: React.FC<UserAssignmentModalProps> = ({ visible, onClose, onAssign, eventId }) => {
  const users = useUsers().users;
  const [usersOnEvent, setUsersOnEvent] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },  
    {
      title: 'Seleccionar',
      key: 'select',
      render: (record: any) => (
        <Checkbox
          checked={usersOnEvent?.map((user: any) => user.uuid_user).includes(record.uuid_user)}
          onChange={() => handleSelect(record.uuid_user)}
        />
      ),
    },
  ];
  const getUsersForthisevent = async (uuid_evento: string) => {
    try {
      const response = await getUsersForEvent(uuid_evento);
      console.log("Usuarios en el evento:", response); // Verificar el contenido
      setUsersOnEvent(response);
    } catch (error) {
      console.log(error);
    }
  }
  const handleSelect = async (uuid: string) => {
    let env = {
      event_id: eventId,
      user_id: uuid
    }
    try {
      if (usersOnEvent.map((user: any) => user.uuid_user).includes(uuid)) {
        await removeEventUser(env.event_id, env.user_id);
      } else {
       const response = await addEventUser(env.event_id, env.user_id);
       if (response.detail) {
        alert(response.detail);
        return;
       }
      

      }
      // Actualizar la lista de usuarios en el evento después de la operación
      const updatedUsers = await getUsersForEvent(eventId);
      setUsersOnEvent(updatedUsers);
      if (usersOnEvent.map((user: any) => user.uuid_user).includes(uuid)) {
        setSelectedUsers((prev) => prev.filter((id) => id !== uuid));
      } else {
        setSelectedUsers((prev) => [...prev, uuid]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssign = () => {
    onAssign(selectedUsers);
    onClose();
  };

  useEffect(() => {
    getUsersForthisevent(eventId);
  }, [eventId]);
  return (
    <Modal
      title="Asignar Usuarios a Evento"
      visible={visible}
      onCancel={onClose}
      footer={[
     
        <Button key="assign" type="primary" onClick={handleAssign}>
         Cerrar
        </Button>,
      ]}
    >
      <Table
        dataSource={users}
        columns={columns}
        rowKey="uuid_user"
        pagination={false}
      />
    </Modal>
  );
};

export default UserAssignmentModal;
