import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem("mbb_token");
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  token: getStoredToken(),
  isAdmin: !!getStoredToken(),

  login: (token: string) => {
    try {
      localStorage.setItem("mbb_token", token);
    } catch {
      console.warn("localStorage not available");
    }
    set({ token, isAdmin: true });
  },

  logout: () => {
    try {
      localStorage.removeItem("mbb_token");
    } catch {
      console.warn("localStorage not available");
    }
    set({ token: null, isAdmin: false });
  },
}));
