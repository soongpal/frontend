import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { useAuthStore } from '../stores/UserStore'

//기본 api서버
export const BASE_URL = 'https://api.soongpal.shop';

//authorization이 필요한 경우...
const api = axios.create({
  //base url
    baseURL: "https://api.soongpal.shop",
    // HttpOnly 쿠키 전송(refresh-token)
    withCredentials: true,
});

// 요청 인터셉터(모든 api요청에 Authorization추가)
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터 (access토큰 만료시 refreshtoken전송, 재요청)
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh 요청 (쿠키 전송됨)
        const res = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 새 토큰으로 헤더 갱신 후 재요청
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (err) {
        useAuthStore.getState().clear();
        window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      }
    }

    return Promise.reject(error);
  }
);

export default api;
