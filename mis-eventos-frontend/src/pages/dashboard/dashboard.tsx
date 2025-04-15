import { Layout } from "antd"
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider"
import Sidebar from "./sidebar";
import { Route, Routes } from "react-router";
import { Events } from "../events/events";
import { Users } from "../users/users";
import { Profile } from "../profile/profile";


export const Dashboard = () => {
  return (
    <Layout >
      <Sider width="15%" style={{ height: '100vh' }}>
        <Sidebar />
      </Sider>
      <Layout>

        <Content  style={{ overflow: 'auto', height: '100vh' }}>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          
        </Content>

      </Layout>
    </Layout>
  );
};