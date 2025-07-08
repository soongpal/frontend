//전체 라우터 모음

import type React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRouter from "./AuthRouter";
import ChatRouter from "./ChatRouter";
import PostRouter from "./PostRouter";
import ProductRouter from "./ProductRouter";
import UserRouter from "./UserRouter";


const AppRouter: React.FC = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="auth/*" element={<AuthRouter />} />
            <Route path="chat/*" element={<ChatRouter />} /> 
            <Route path="post/*" element={<PostRouter />} />
            <Route path="product/*" element={<ProductRouter />} />
            <Route path="user/*" element={<UserRouter />} />
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    )
}

export default AppRouter;