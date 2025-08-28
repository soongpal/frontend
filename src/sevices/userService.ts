//user관련 api
import { BASE_URL } from "./api";
import axios from "axios";

//내정보 인터페이스
interface MyInfoResponse{
    userId: number;
    nickname: string;
    email: string;
    kakoId: string;
}

//로그아웃
export const logout = async () => {
    try {
        const res = await axios.post(
            `${BASE_URL}/api/users/logout`,
        );
        return res.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

//내 정보 조회
export const myInfo = async () : Promise<MyInfoResponse> => {

    try {
        const res = await axios.get(
            `${BASE_URL}/api/users/me`,
        );
        return res.data;
  } catch (error) {
    console.error('내 정보 불러오기 실패:', error);
    throw error;
  }
};

//회원 탈퇴
export const withdrawal = async () => {

    try {
        await axios.delete(
            `${BASE_URL}/api/users/me`,
        );
  } catch (error) {
    console.error('회원탈퇴 실패:', error);
    throw error;
  }
};

//내정보 수정
export const mySetting = async (nickname: string) => {

    try {
        const res = await axios.patch(
            `${BASE_URL}/api/users/me`,
            { nickname }
        );
        return res.data;
  } catch (error) {
    console.error('닉네임 변경 실패:', error);
    throw error;
  }
};

//내가쓴글 조회
export const myPost = async () => {

    try {
        const res = await axios.get(
            `${BASE_URL}/api/my-page/posts`,
        );
        return res.data;
  } catch (error) {
    console.error('내가 쓴 글 불러오기 실패:', error);
    throw error;
  }
};

//내가 좋아요한 게시글 조회
export const myFavorites = async () => {

    try {
        const res = await axios.get(
            `${BASE_URL}/api/my-page/like`,
        );
        return res.data;
  } catch (error) {
    console.error('내가 좋아요한 글 불러오기 실패:', error);
    throw error;
  }
};
