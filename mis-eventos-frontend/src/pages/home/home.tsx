import { Layout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import useEvent from "../../hooks/eventHook";
import Cards from "../../components/card";
import { Link } from "react-router";
import {ReconciliationFilled } from '@ant-design/icons';
import useUserStore from "../../hooks/store";
import useSession from "../../hooks/useSession";

const HomePage = () => {
    const events = useEvent().event;
    const loading = useEvent().loading;
    const token = useUserStore((state: any) => state.userToken);
    const isAuthenticated = useSession(token);
    return (<>
        <Layout >
            <Header style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <h1 style={{color: 'white'}}> <ReconciliationFilled />   Mis Eventos</h1>  
                <div style={{ textAlign: 'right', color: 'white' }}>
                    {isAuthenticated ? (
                        <a onClick={()=> {localStorage.clear(); return window.location.href = '/'}} style={{color:'white'}} >Cerrar Sesión</a>
                    ) : (
                        <Link style={{color:'white'}} to="/auth">Iniciar Sesión</Link>
                    )}
                </div>
                </Header>
            <Content>
                {loading
                    ? <Spin />
                    : <div className="body-events">{events?.map((event: any) => { return <Cards data={event} /> })}</div>
                }
            </Content>

        </Layout>


    </>)

}


export default HomePage;