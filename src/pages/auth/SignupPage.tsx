//회원가입 페이지
import type React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//api
import { postNickname } from "../../sevices/authService";

//닉네임 조건함수
import { nicknameValidator } from "../../utils/validation/validateSignup";


const SignupPage: React.FC = () =>{

    //회원가입후 메인 페이지로 ㄱㄱ
    const navigate = useNavigate();

    //temp token받아오기
    const [searchParams] = useSearchParams();
    const tempToken = searchParams.get("temp_token");

    //닉네임 영역
    const [nickname, setNickname] = useState("");

    //닉네임 유효성 검사 에러 메세지
    const [error, setError] = useState('');

    //닉네임 유효성 검사 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;
       

        // 유효성 검사 및 에러 메시지 설정
        if (!nicknameValidator.validate(newNickname)) {
        setError(nicknameValidator.getErrorMessage(newNickname));
        } else {
        setError('');
        setNickname(newNickname);
        }
    };


    //닉네임+임시토큰 전송
    const handleSubmit = async (e: React.FormEvent) => {
        //새로고침 방지
        e.preventDefault();

        //임시토큰 없을떄
        if (!tempToken) {
        console.log('임시 토큰 없음');
        return;
        }

        //유효하지 않은 닉네임일때
        if (!nicknameValidator.validate(nickname)) {
            setError(nicknameValidator.getErrorMessage(nickname));
            console.log('유효하지 않은 닉네임');
            return;
        }

        //서버로 토큰+닉네임 전송 
        try {
            const userData = await postNickname(nickname, tempToken);
            console.log(`회원가입 성공! ${userData.nickname}님 환영합니다`);
            navigate('/');
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
                onChange={handleChange}
                placeholder="닉네임을 입력하세요"
                className="nickname-input"
                required/>

                <p>*8글자 이내, 공백과 특수문자는 사용 금지</p>

                {error && <p style={{ color: 'red' }}>{error}</p>}

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
