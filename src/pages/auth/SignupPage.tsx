//회원가입 페이지
import type React from "react";

const SignupPage: React.FC = () =>{
    return(
        <div className="container">
            회원가입페이지-닉네임 입력할거임!!
            중복방지(백엔드 연동 버튼)
            숫자, 영어, 한글만 가능(특수버튼 제외 )로직 validation함수 추가
        </div>
    )
}

export default SignupPage;