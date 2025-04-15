import './styles/App.css'
import {Navigate, Route, Routes} from "react-router";
import HomePage from "./pages/home/home";
import {Auth} from "./pages/auth/auth";
import { Dashboard } from './pages/dashboard/dashboard';
import useSession from "./hooks/useSession";

import useUserStore from './hooks/store';

function App() {
  const token = useUserStore((state: any) => state.userToken);
  const isAuthenticated = useSession(token);
  return (
    <>
        <Routes>
            <Route path="/*"  element={<Auth />} />
            <Route path="/home" element={localStorage.getItem('role') !== 'dashboard' ? <HomePage /> : <Navigate to="/dashboard" />}/>
            <Route path="/dashboard/*" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />

        </Routes>
    </>
  )
}

export default App
