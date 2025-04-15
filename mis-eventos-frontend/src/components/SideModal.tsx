import React from 'react';
import { Drawer, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import useUserStore from '../hooks/store';


interface SideModalProps {
  title: string;
  children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({ title, children }) => {
  const visible = useUserStore((state: any) => state.modalVisible);
  const toggleModal = useUserStore((state: any) => state.toggleModalVisible);
  const setEventData = useUserStore((state: any) => state.setEventData);

  /**
   * Opens the side modal with the given title and children.
   * Also sets the event data to null.
   */
  const showDrawer = () => {
    console.log('showDrawer');  
    setEventData(null);
    toggleModal(true);
  };

  const onClose = () => {
    setEventData(null);
    toggleModal(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} className="button-create">
        <PlusOutlined />
      </Button>
      <Drawer
        title={title}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={400}
      >
        {children}
      </Drawer>
    </>
  );
};

export default SideModal;
