import React, { useEffect } from "react";
import TodoList from "../components/TodoList";
import { useTodoStore } from "../store/todoStore";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";

const Dashboard = () => {
  const {
    todos,
    fetchTodos,
    deleteTodo,
    setCurrentTodo,
    openModal,
    modalOpen,
    closeModal,
  } = useTodoStore();
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Todos</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>
      <TodoList
        onDelete={deleteTodo}
        todos={todos}
        onEdit={setCurrentTodo}
        onOpenModal={openModal}
      />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <TodoForm />
      </Modal>
    </div>
  );
};

export default Dashboard;
