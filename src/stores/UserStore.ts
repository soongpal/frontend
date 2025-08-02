import { create} from "zustand";
import { persist } from 'zustand/middleware';
import { type User } from "../types/user"

type ProductStore = {
  user: User;
  setUser: (user: User) => void;
  updateUser: (updated: Partial<User>) => void;
};

const defaultUser: User = {//마스터 아이디
  id: 0,
  nickname: "garam",
  password: "0000",
  isLogin: true,
};

export const useUserStore = create<ProductStore>()(
  persist(
    (set) => ({
        user: defaultUser,//마이페이지 확인용

        setUser: (user: User) => set({ user }),

        updateUser: (updated: Partial<User>) =>
            set((state) => ({
            user: {
                ...state.user,
                ...updated,
            },
            })),
        }),
        {
        name: "user-storage", // localStorage 키 이름
        partialize: (state) => ({ user: state.user }), // user만 저장
        }
    )
    );