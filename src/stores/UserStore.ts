import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import type { UserInfo } from "../types/user";


//access token관련

export interface AuthState {
  accessToken: string | null;
  isLogin: boolean;
  user: UserInfo | null;  
  setAccessToken: (token: string | null) => void;
  setUser: (user: UserInfo | null) => void;
  clear: () => void;
}

//1. session저장소에 access token 저장(창 닫기 전까지 로그인 유지용)
const sessionStorageStorage: PersistStorage<AuthState> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    sessionStorage.removeItem(name);
  },
};


//2. access token store
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLogin: false,
      user: null,
      setAccessToken: (token) => set({ accessToken: token, isLogin: !!token, }),
      setUser: (user) => set({ user }),
      clear: () => set({ accessToken: null, isLogin: false, user: null }),
    }),
    {
      name: "auth",
      storage: sessionStorageStorage,
    }
  )
);


