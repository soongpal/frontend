//인증관련 (로그인, 회원가입)
import api from './api';

 //최종 회원가입
export const postNickname = async (nickname: string, tempToken: string) => {

    try {
        const res = await api.post(
            `/api/auth/register`,
            {
                nickname,
            },
            {
                headers: {
                    Authorization: `Bearer ${tempToken}`,
                    },
            }
        );
        return res.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

//fcm토큰 전송
export const sendFcmToken= async (token: string) => {
  try {
    const response = await api.post('/api/admin/notifications/test', { token });
    return response.data;
  } catch (error) {
    console.error('fcm토큰 전송 실패', error);
    throw error;
  }
};