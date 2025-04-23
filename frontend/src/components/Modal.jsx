import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shawdow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
