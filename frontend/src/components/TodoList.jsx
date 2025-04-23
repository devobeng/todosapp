import React from "react";

const TodoList = ({ onEdit, onDelete, todos, onOpenModal }) => {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-gray-500">No todos available</p>;
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="p-4 bg-gray-100 rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{todo.title}</h3>
            {todo.description && <p className="text-sm">{todo.description}</p>}
          </div>
          <div className="space-x-2">
            <button
              onClick={() => {
                onEdit(todo);
                onOpenModal();
              }}
              className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(todo._id)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
