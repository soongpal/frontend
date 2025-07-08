// Header, Footer, Outlet을 포함하는 메인 레이아웃

import type React from "react";
import Header from "./header/Header";
import { Outlet } from "react-bootstrap-icons";
import Footer from "./footer/Footer";

const Layout: React.FC = () =>{
    return(
        <div className="App">
            <Header></Header>
            <Outlet></Outlet>
            <div><h1>안녕하세요</h1>
            <h2>이거 왜 출력이 안되노 ㅋㅋ</h2>
            <h1>썅 이거 왜 겹친거임!!!</h1></div>
            <Footer></Footer>
        </div>
    );
}

export default Layout;