import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UpdateTodo = ({ todoId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch the details of the todo based on the todoId
    const fetchTodoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/todos/${todoId}`
        );
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching Todo details:", error);
      }
    };
    fetchTodoDetails();
  }, [todoId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === "") return;

    try {
      await axios.put(`http://localhost:8080/todos/${todoId}`, {
        title: title,
        description: description,
      });
      // Handle successful update, e.g., show a success message or navigate back to the main todo list page
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Todo</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter todo title..."
          className="border border-gray-300 p-2 mr-2"
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description..."
          className="border border-gray-300 p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 ml-2 rounded"
        >
          Update Todo
        </button>
      </form>
      <Link to="/" className="bg-gray-500 text-white p-2 rounded">
        Back to Todos
      </Link>
    </div>
  );
};

export default UpdateTodo;
