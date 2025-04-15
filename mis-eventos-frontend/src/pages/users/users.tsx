
import { Table, Button } from 'antd';
import { FormUsers } from './formUsers';
import SideModal from '../../components/SideModal';
import useRoles from '../../hooks/rolesHook';
import useUsers from '../../hooks/usersHook';
import { deleteUser } from '../../services/users';
import useUserStore from '../../hooks/store';

export const Users = () => {
    const users = useUsers().users;
    const roles = useRoles().roles;
    const setRefresh = useUserStore((state: any) => state.toggleRefreshView);
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
        title: 'Rol',
        dataIndex: 'uuid_role',
        key: 'uuid_role',   
        render: (record: any) =><>{asigrole(record)}</> ,
      },
      {
        title: 'Acciones',
        key: 'uuid_user',
        render: ( record: any) => (
          <Button onClick={() => handleDelete(record.uuid_user)}>Eliminar</Button>
        ),
      },
    ];
    const asigrole = (id: string) => {
      
    for (let i in roles) {
      if (id === roles[i]["uuid_rol"]) {
        return roles[i]["name"];
      }
    }
  };
  
  
    const handleDelete = async (key: string) => {
   
      try {
       await deleteUser(key);
       return setRefresh(Math.random().toString());
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
   
        <Table columns={columns} dataSource={users} />
        <SideModal title="Agregar Usuario" children={<FormUsers />} />
  
      </>
    );
  };
  
