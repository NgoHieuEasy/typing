import { IUser } from "@/hooks/interfaces/auth";
import { ACCESS_TOKEN } from "@/utils/constants";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  isExpiredToken: boolean;
  setExpiredToken: (isExpired: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isExpiredToken: false,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setExpiredToken: (isExpired) => set({ isExpiredToken: isExpired }),
}));
export const useIsLoggedIn = () => {
  const user = useUserStore((state) => state.user);
  return !!localStorage.getItem(ACCESS_TOKEN) && user !== null;
};
