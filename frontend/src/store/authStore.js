import { create } from "zustand";
import api from "../api/axios";
export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  loggedIn: false,
  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    set({ token: res.data.token, loggedIn: true });
  },

  register: async (email, password) => {
    const res = await api.post("auth/register", { email, password });
    localStorage.setItem("token", res.data.token);
    set({ token: res.data.token, loggedIn: true });
  },
  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("token");
    set({ token: null, loggedIn: false });
  },
}));
