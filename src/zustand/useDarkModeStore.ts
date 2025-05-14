import { create } from "zustand";

interface ThemeState {
  isDarkStore: boolean;
  setDarkMode: (isDarkStore: boolean) => void;
  clearDarkMode: () => void;
}
export const useDarkModeStore = create<ThemeState>((set) => ({
  isDarkStore: false,
  setDarkMode: (isDarkStore) => set({ isDarkStore }),
  clearDarkMode: () => set({ isDarkStore: false }),
}));
