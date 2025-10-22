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

//서버 알림 설정 - 토큰 전송
export const sendFcmToken= async (token: string) => {
  try {
    const response = await api.patch('/api/fcm/enable', null, { 
      params: {
        fcmToken: token
      }
     });
    return response.data;
  } catch (error) {
    console.error('fcm토큰 전송 실패', error);
    throw error;
  }
};

//서버 알림 해제(토큰 삭제)
export const diableFcmToken= async (token: string) => {
  try {
    const response = await api.patch('/api/fcm/disable', null, { 
      params: {
        fcmToken: token
      }
     });
    return response.data;
  } catch (error) {
    console.error('fcm토큰 전송 실패', error);
    throw error;
  }
};

//서버 토큰 여부
export const isAlarmOn = async (token: string) => {
  try {
    const response = await api.get('/api/fcm', { 
      params: {
        fcmToken: token
      }
     });

    return response.data;
  } catch (error) {
    console.error('fcm토큰 여부 확인 실패', error);
    throw error;
  }
};


//서버 토큰 삭제
export const deleteFcmToken= async (token: string) => {
  try {
    const response = await api.delete('/api/fcm/disable', { 
      params: {
        fcmToken: token
      }
     });

    return response.data;
  } catch (error) {
    console.error('fcm토큰 삭제 실패', error);
    throw error;
  }
};

