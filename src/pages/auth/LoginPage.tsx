import type React from "react";

import "../../styles/Login.css"

//로그인 페이지
const LoginPage: React.FC = () =>{

    const handleKakaoClick = () => {
        //카카오 로그인 주소
    }

    return(
        <div className="container my-5 d-flex align-items-center justify-content-center">
            <div className="login-container">
                <h3>로그인</h3>
                <h6>숭팔이에서 중고거래와 공동구매를 즐겨보세요!</h6>
                <button onClick={handleKakaoClick}>
                    <img src="/images/kakao/smalllong.png" alt="login" />
                </button>
            </div>
        </div>
    )
}

export default LoginPage;