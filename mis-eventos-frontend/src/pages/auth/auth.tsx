import { Col, Row } from "antd";
import {   Route, Routes } from "react-router";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

export const Auth = () => {
    return <Row id="auth-container" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col xs={0}  lg={14} className="background-image"></Col>
        <Col  xs={24}  lg={10}>
      
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Routes>
           
        </Col>
    </Row>;
};