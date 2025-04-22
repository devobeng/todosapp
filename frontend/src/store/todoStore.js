import create from "zustand";
import api from "../api/axios";
import { TodoSchema } from "../utils/schemas";

export const useTodoStore = create((set) => ({
  todos: [],
  fetchTodos: async () => {
    const res = await api.get("/todo");
    if (res.status === 200) {
      set({ todos: res.data });
    }
  },

  addTodo: async (todo) => {
    const parsedTodo = TodoSchema.parse(todo);
    const res = await api.post("/todos", parsedTodo);
    set((state) => ({ todos: [...state.todos, res.data] }));
  },
  updateTodo: async (id, updates) => {
    const parsedTodo = TodoSchema.parse({ id, ...updates });
    const res = await api.patch(`/todos/${id}`, parsedTodo);
    if (res.status === 200) {
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? res.data : t)),
      }));
    }
  },

  deleteTodo: async (id) => {
    await api.delete(`/todos/${id}`);
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) }));
  },
}));
