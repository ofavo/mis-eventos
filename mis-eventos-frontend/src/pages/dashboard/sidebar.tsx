import React from 'react';
import { Menu, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../hooks/store';
import { CalendarOutlined, LogoutOutlined, UserSwitchOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const clearToken = useUserStore((state: any) => state.setUserToken);

  const handleLogout = () => {
    localStorage.clear()
    clearToken(null)
   return window.location.href = '/'
  };
  const menu : MenuItem[] = [
    {
      key: '',
      label: 'Eventos',
      icon: <CalendarOutlined />,
    },
    {
      key: 'users',
      label: 'Usuarios',
      icon: <UserSwitchOutlined />,
    },
    {
      key: 'logout',
      label: 'Salir',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    },
  ];
  return (
    <div className="sidebar">
      <Menu mode="inline"
         items={menu}  
          defaultSelectedKeys={["1"]}
          onClick={(e: any) => {
            if(e.key === 'logout') {
              return handleLogout();
            } else {
             return navigate(`/dashboard/${e.key}`);
            }
          }}
          />
    </div>
  );
};

export default Sidebar;