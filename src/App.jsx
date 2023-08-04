import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/todos");
      setTodos(response.data.data);
    } catch (error) {
      console.error("Error fetching Todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

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
      const response = await axios.post("http://localhost:8080/todos", {
        title: title,
        description: description,
        completed: false,
      });

      setTodos([...todos, response.data.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle the case when the title is not unique
        alert(error.response.data.error);
      } else {
        console.error("Error creating Todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo.ID !== id));
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a new todo..."
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
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.ID} className="my-2 p-2 border border-gray-300 rounded">
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
            <button
              onClick={() => handleDelete(todo.ID)}
              className="bg-red-500 text-white p-2 ml-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
