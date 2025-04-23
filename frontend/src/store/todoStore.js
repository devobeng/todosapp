import { create } from "zustand";
import api from "../api/axios";
import { TodoSchema } from "../utils/schemas";
import { useAuthStore } from "./authStore";
import { toast } from "react-toastify";

export const useTodoStore = create((set) => ({
  todos: [],
  currentTodo: null,
  modalOpen: false,
  setCurrentTodo: (todo) => set({ currentTodo: todo }),
  clearCurrentTodo: () => set({ currentTodo: null }),
  openModal: () => set({ modalOpen: true }),
  closeModal: () => set({ modalOpen: false }),
  fetchTodos: async () => {
    const { token } = useAuthStore.getState();

    if (!token) {
      console.warn("User not logged in");
      return;
    }
    const res = await api.get(`/todo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      set({ todos: res.data });
    }
  },

  addTodo: async (todo) => {
    try {
      const { token } = useAuthStore.getState();
      const parsedTodo = TodoSchema.parse(todo);
      const res = await api.post("/todo", parsedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ todos: [...state.todos, res.data] }));
    } catch (error) {
      console.error("Error parsing todo:", error);
    }
  },
  updateTodo: async (id, updates) => {
    try {
      const { token } = useAuthStore.getState();
      const parsedTodo = TodoSchema.parse({ ...updates });
      const res = await api.patch(`/todo/${id}`, parsedTodo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? res.data : t)),
        }));
      }
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error parsing todo:", error);
      return;
    }
  },

  deleteTodo: async (id) => {
    try {
      const { token } = useAuthStore.getState();
      await api.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  },
}));
