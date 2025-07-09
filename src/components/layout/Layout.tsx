// Header, Footer, Outlet을 포함하는 메인 레이아웃

import type React from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";

const Layout: React.FC = () =>{
    return(
        <div className="continer-md">
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
}

export default Layout;