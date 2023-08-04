import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Fetch the details of the todo to pre-populate the form
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/todos/${id}`);
        const { title, description } = response.data.data;
        setTitle(title);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching Todo:", error);
      }
    };

    fetchTodo();
  }, [id]);

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
      await axios.put(`http://localhost:8080/todos/${id}`, {
        title: title,
        description: description,
      });

      // Redirect back to the main page after updating the todo
      history.push("/");
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Todo</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-400 rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
            className="border border-gray-400 rounded px-2 py-1"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Todo
        </button>
      </form>
    </div>
  );
};

export default UpdateTodo;
