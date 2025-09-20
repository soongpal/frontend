//user관련 api
import type { Product } from "../types/product";
import type { UserInfo } from "../types/user";
import api from "./api";

//로그아웃
export const logout = async () => {
    try {
        const res = await api.post(
            `/api/users/logout`,
        );
        return res.data;
  } catch (error) {
    console.error('로그아웃 실패:', error);
    throw error;
  }
};

//내 정보 조회
export const myInfo = async () => {

    try {
        const res = await api.get(
            `/api/users/me`,
        );
        return res.data as UserInfo;
        
  } catch (error) {
    console.error('user service - 내 정보 불러오기 실패:', error);
    throw error;
  }
};

//회원 탈퇴
export const withdrawal = async () => {

    try {
        await api.delete(
            `/api/users/me`,
        );
  } catch (error) {
    console.error('회원탈퇴 실패:', error);
    throw error;
  }
};

//내정보 수정
export const mySetting = async (nickname: string) => {

    try {
        const res = await api.patch(
            `/api/users/me`,
            {nickname}
        );
        return res.data.result as UserInfo;
  } catch (error) {
    console.error('닉네임 변경 실패:', error);
    throw error;
  }
};

//내가쓴글 조회
export const myPost = async (page: number) => {

    try {
      const res = await api.get(`/api/my-page/posts`, {  params: { page: page } });
      const { boards, currentPage, totalPages } = res.data.result;
  
      return {
        products: boards as Product[],
        currentPage,
        totalPages
      };

  } catch (error) {
    console.error('내가 쓴 글 불러오기 실패:', error);
    throw error;
  }
};

//내가 좋아요한 게시글 조회
export const myFavorites = async (page: number) => {

    try {
      const res = await api.get(`/api/my-page/like`, {  params: { page: page } });
      const { boards, currentPage, totalPages } = res.data.result;
  
      return {
        products: boards as Product[],
        currentPage,
        totalPages
      };
  } catch (error) {
    console.error('내가 좋아요한 글 불러오기 실패:', error);
    throw error;
  }
};
