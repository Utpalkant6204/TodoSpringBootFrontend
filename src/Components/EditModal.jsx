import React, { useState, useEffect } from "react";
import Axios from "axios";

const Modal = ({ closeModal, fetchData, todoToEdit }) => {
  const [input, setInput] = useState(todoToEdit ? todoToEdit.data : "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInput(todoToEdit ? todoToEdit.data : "");
  }, [todoToEdit]);

  const HandleChange = (e) => {
    setInput(e.target.value);
  };

  const HandleClick = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setIsLoading(true);
      if (todoToEdit) {
        await Axios.put(`http://localhost:8080/updateTodo/${todoToEdit.id}`, {
          data: input,
        });
      } else {
        await Axios.post("http://localhost:8080/saveTodo", { data: input });
      }
      fetchData();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="relative bg-white rounded-lg p-8">
          <button className="absolute top-0 right-0 p-4" onClick={closeModal}>
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-lg font-bold mb-4">
            {todoToEdit ? "Edit Item" : "Add Item"}
          </h2>
          <form>
            <input
              type="text"
              placeholder="Enter item..."
              className="border border-gray-300 rounded-md px-3 py-2 mb-4 mx-2"
              value={input}
              onChange={HandleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mx-2"
              onClick={HandleClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : todoToEdit ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
