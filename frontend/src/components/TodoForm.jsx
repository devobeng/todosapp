// src/components/TodoForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TodoSchema } from "../utils/schemas";
import { useTodoStore } from "../store/todoStore";

const TodoForm = () => {
  const { currentTodo, addTodo, updateTodo, closeModal, clearCurrentTodo } =
    useTodoStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TodoSchema),
    defaultValues: currentTodo || {
      title: "",
      description: "",
      isCompleted: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (currentTodo) {
        await updateTodo(currentTodo._id, data);
      } else {
        await addTodo(data);
      }
      reset();
      clearCurrentTodo();
      closeModal();
    } catch (err) {
      console.error("Failed to submit", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" {...register("isCompleted")} />
        <label>Is Completed</label>
      </div>
      <button
        type="submit"
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        {currentTodo ? "Update" : "Add"} Todo
      </button>
    </form>
  );
};

export default TodoForm;
