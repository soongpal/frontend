//회원가입 페이지
import type React from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

//api
import { postNickname, sendFcmToken } from "../../api/authAPI";

//닉네임 조건함수
import { nicknameValidator } from "../../utils/validation/validateSignup";
import { getFcmToken, requestNotificationPermission } from "../../firebase";
import { useAuthStore } from "../../stores/UserStore";


const SignupPage: React.FC = () =>{

    //회원가입후 메인 페이지로 ㄱㄱ
    const navigate = useNavigate();

    //accessToken설정
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    //temp token받아오기
    const [searchParams] = useSearchParams();
    const tempToken = searchParams.get("temp_token");

    //fcm토큰 저장
    const [fcmToken, setFcmToken] = useState<string>("");

    //닉네임 영역
    const [nickname, setNickname] = useState("");

    // 알림 허용 체크박스 상태
    const [check, setcheck] = useState(false);

    //닉네임 유효성 검사 에러 메세지
    const [error, setError] = useState('');

    // 닉네임 유효성 검사 함수
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNickname = e.target.value;
        
        setNickname(newNickname); 
        
        if (!nicknameValidator.validate(newNickname)) {
            setError(nicknameValidator.getErrorMessage(newNickname));
        } else {
            setError('');
        }
    };

    //체크하면 브라우저 알림 설정, fcm토큰 발급
    const hadleNotification = async (): Promise<boolean> => {
        try {
            // 1 브라우저 알림 권한 요청
            const granted = await requestNotificationPermission();
            if (!granted) {
                console.warn("브라우저 알림 허용 거부됨");
                return false;
            }

            // 2 FCM 토큰 발급
            const token = await getFcmToken();
            if (!token) {
                console.error("FCM 토큰 발급 실패");
                return false;
            }
            setFcmToken(token);
            return true;
        } catch (error) {
            console.error("알림 활성화 중 오류 발생:", error);
            return false;
        }
    };

    const handleCheckboxChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = e.target.checked;
        setcheck(isChecked);

        if (isChecked) {
            const success = await hadleNotification();
            if (!success) {
                console.warn(
                    "알림 설정 실패, 체크박스는 선택& 토큰은 전송되지 않음."
                );
            }
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
            return;
        }

        //서버로 토큰+닉네임 전송 
        try {
            const userData = await postNickname(nickname, tempToken);
            console.log(`회원가입 성공! ${userData.nickname}님 환영합니다`);

            //accesstoken설정
            setAccessToken(userData.data.accessToken);

            // token서버 전송
            if (check && fcmToken) {
                try {
                    await sendFcmToken(fcmToken);
                    console.log("FCM 토큰 전송 성공");
                } catch (fcmError) {
                    console.error("FCM 토큰 전송 중 오류 발생:", fcmError);
                }
            }

            navigate('/');
        } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다.');
        }
    };

    return(
        <div className="container">
            <h3>회원가입</h3>
            <form onSubmit={handleSubmit} className="d-flex gap-4 flex-col">
                <div className="d-flex flex-col">
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleChange}
                        placeholder="닉네임을 입력하세요"
                        className="nickname-input"
                        required/>

                    <p>*8글자 이내, 공백과 특수문자는 사용 불가</p>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="d-flex align-items-center gap-2">
                    <input
                        type="checkbox"
                        id="allow-notifications"
                        checked={hadleNotification}
                        onChange={handleCheckboxChange}
                    />
                    <label  style={{ margin: 0 }}>
                        알림을 허용하시겠습니까?
                    </label>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={!!error || nickname.trim() === ''}>
                    제출
                </button>

            </form>
        </div>
    )
}

export default SignupPage;
