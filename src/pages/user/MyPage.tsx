//마이페이지(마이 페이지 메인임)

import type React from "react";
import { ArrowRight, ChatDots, Gear, Heart, PencilSquare, PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/UserStore";

const MyPage: React.FC = () =>{
    const navigate = useNavigate();
    //유저 정보 불러오기
    const { user } = useUserStore();

    //로그아웃 함수
    const logout = () =>{
        alert("로그아웃되었습니다")
    }

    return(
        <div className="d-flex flex-column align-items-center gap-4 my-5">
            <PersonCircle size={100}/>
            <h3>{user.nickname}</h3>

            <div onClick={() => navigate("/user/favorites")} className="container d-flex align-items-center border-bottom py-3" style={{ cursor: 'pointer' }}>
                <Heart size={25} className="me-3"/>
                <h5>관심 목록</h5>
                <ArrowRight size={25} className="ms-auto"/>
            </div>

            <div onClick={() => navigate("/chat/chatlist")} className="container d-flex align-items-center border-bottom py-3" style={{ cursor: 'pointer' }}>
                <ChatDots size={25} className="me-3"/>
                <h5>채팅 목록</h5>
                <ArrowRight size={25} className="ms-auto"/>
            </div>

            <div onClick={() => navigate("/user/mypost")} className="container d-flex align-items-center border-bottom py-3" style={{ cursor: 'pointer' }}>
                <PencilSquare size={25} className="me-3"/>
                <h5>내가 쓴 글</h5>
                <ArrowRight size={25} className="ms-auto"/>
            </div>
        
            <div onClick={() => navigate("/user/setting")} className="container d-flex align-items-center py-3" style={{ cursor: 'pointer' }}>
                <Gear size={25} className="me-3"/>
                <h5>설정</h5>
                <ArrowRight size={25} className="ms-auto"/>
            </div>

            <a href="" onClick={logout} className="text-muted">로그아웃</a>
        </div>
    )
}

export default MyPage;