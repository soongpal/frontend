//마이페이지(마이 페이지 메인임)

import type React from "react";
import { useNavigate } from "react-router-dom";

//style
import { ArrowRight, ChatDots, Gear, Heart, Megaphone, PencilSquare } from "react-bootstrap-icons";
import '../../styles/Mypage.css'

//api
import { logout } from "../../api/userAPI";

//store
import { useAuthStore } from "../../stores/UserStore";

const MyPage: React.FC = () =>{

    const navigate = useNavigate();

    //유저 정보 불러오기
    const { user } = useAuthStore();
    const isLogin = !!user; 

    //로그아웃 함수
    const clearAuth = useAuthStore((state) => state.clear);
    //1.api 2. store초기화
    const handlelogout = async () => {
            try {
                await logout();
                clearAuth();

                window.location.href = "/";
                console.log('로그아웃 성공');
                alert('로그아웃되었습니다');
            } catch (error) {
                console.error('로그아웃실패:', error);
            }
        };

    if (!isLogin) {
        return <div>로그인 정보가 없습니다.</div>;
    }
    
    return(
        <div className="d-flex flex-column align-items-center gap-4 my-5">
          <h3 className="d-flex">{user.nickname}님 안녕하세요!</h3>

            <div onClick={() => navigate("/user/favorites")} className="flex-container">
                <Heart size={25} className="me-3"/>
                <h5 className="h5-style">관심 목록</h5>
                <ArrowRight size={25} className="arrow-icon"/>
            </div>

            <div onClick={() => navigate("/chat/chatlist")} className="flex-container">
                <ChatDots size={25} className="me-3"/>
                <h5 className="h5-style">채팅 목록</h5>
                <ArrowRight size={25} className="arrow-icon"/>
            </div>

            <div onClick={() => navigate("/user/mypost")} className="flex-container">
                <PencilSquare size={25} className="me-3"/>
                <h5 className="h5-style">내가 쓴 글</h5>
                <ArrowRight size={25} className="arrow-icon"/>
            </div>

            <div onClick={() => navigate("/user/notice")} className="flex-container">
                <Megaphone size={25} className="me-3 "/>
                <h5 className="h5-style">공지사항</h5>
                <ArrowRight size={25} className="arrow-icon"/>
            </div>
        
            <div onClick={() => navigate("/user/setting")} className="flex-container">
                <Gear size={25} className="me-3"/>
                <h5 className="h5-style">설정</h5>
                <ArrowRight size={25} className="arrow-icon"/>
            </div>

            <a href="" onClick={handlelogout} style={{color: 'var(--light-grey-hover-color)'}}>로그아웃</a>
        </div>
    )
}

export default MyPage;