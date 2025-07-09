//전체 라우터 모음

import type React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRouter from "./AuthRouter";
import ChatRouter from "./ChatRouter";
import PostRouter from "./PostRouter";
import ProductRouter from "./ProductRouter";
import UserRouter from "./UserRouter";
import Layout from "../components/layout/Layout";


const AppRouter: React.FC = ()=>{
    
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="auth/*" element={<AuthRouter />} />
                    <Route path="chat/*" element={<ChatRouter />} /> 
                    <Route path="post/*" element={<PostRouter />} />
                    <Route path="product/*" element={<ProductRouter />} />
                    <Route path="user/*" element={<UserRouter />} />
                    <Route path="*" element={<NotFoundPage />}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRouter;