import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  isAuthenticated: false,
  currentUser: null,
  users: [],
  error: null,
  register: (user) =>
    set((state) => ({
      users: [...state.users, { ...user }],
    })),
}));
