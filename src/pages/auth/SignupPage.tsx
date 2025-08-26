//회원가입 페이지
import type React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

//api
import { postNickname } from "../../sevices/authService";


const SignupPage: React.FC = () =>{
    //temp token받아오기
    const [searchParams] = useSearchParams();
    const tempToken = searchParams.get("temp_token");

    //닉네임 영역
    const [nickname, setNickname] = useState("");

    //닉네임+임시토큰 전송
    const handleSubmit = async (e: React.FormEvent) => {
        //새로고침 방지
        e.preventDefault();

        //임시토큰 없을떄
        if (!tempToken) {
        console.log('임시 토큰 없음');
        return;
        }

        try {
            const userData = await postNickname(nickname, tempToken);
            console.log(`회원가입 성공! 환영합니다, ${userData.nickname}`);
        // 로그인 완료 후 다음 페이지로 리다이렉션
        } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다.');
        }
    };

    return(
        <div className="container">
            <h3>회원가입</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="nickname-input"
                required/>
                <button
                type="submit"
                className="submit-button">
                제출
                </button>
            </form>
        </div>
    )
}

export default SignupPage;

//중복방지(백엔드 연동 버튼)
//숫자, 영어, 한글만 가능(특수버튼 제외 )로직 validation함수 추가