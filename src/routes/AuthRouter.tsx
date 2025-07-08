import type React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

//인증 관련 라우트
const AuthRouter : React.FC = () => {
    return(
        <Routes>
            <Route path="login" element={<LoginPage />}/>
            <Route path="signup" element={<SignupPage />}/>
        </Routes>
    )
}

export default AuthRouter;