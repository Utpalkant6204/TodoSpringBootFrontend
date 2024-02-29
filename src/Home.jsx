import React, { useEffect, useState } from "react";
import "./Home.css";
import Axios from "axios";
import Modal from "./Components/modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const Home = () => {
  const [Todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        "https://todospringbootbackend.onrender.com/getTodos"
      );
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
    setEditTodo(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setEditTodo(null);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await Axios.delete(
        `https://todospringbootbackend.onrender.com/deleteTodo/${id}`
      );
      if (res.status === 200) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.log("Error in delete : ", error);
    }
  };

  const handleEdit = (todo) => {
    setIsModalOpen(true);
    setIsEditModalOpen(true);
    setEditTodo(todo);
  };

  return (
    <div>
      <div className="bg-gray-900 flex items-center justify-center p-5">
        <p className="header_text text-3xl max-[640px]:text-2xl">
          Todo Spring Boot App
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        {Todos.map((todo) => (
          <div
            key={todo.id}
            className="mb-4 p-2 border rounded-lg flex justify-between items-center textbar w-[40%] transition duration-300 ease-in-out hover:scale-x-105 max-[640px]:w-[80%]"
          >
            <div className="text-base textbar1">{todo.data}</div>
            <div>
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEdit(todo)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(todo.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 mb-2 block w-[40%] rounded border-2 border-primary px-6 pb-[6px] pt-2 uppercase leading-normal transition duration-150 ease-in-out hover:border-primary-600 text-lg btn max-[640px]:w-[80%]"
          data-te-ripple-init
          onClick={openModal}
        >
          Add Items
        </button>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          fetchData={fetchData}
          editTodo={editTodo}
          isEditModalOpen={isEditModalOpen}
        />
      )}
    </div>
  );
};

export default Home;
