//인증관련 (로그인, 회원가입)
import { BASE_URL } from "./api";
import axios from 'axios';

 //닉네임+임시토큰 전송
export const postNickname = async (nickname: string, tempToken: string) => {

    try {
        const res = await axios.post(
            `${BASE_URL}/api/auth/register`,
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
