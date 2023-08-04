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
      console.error("Error creating Todo:", error);
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
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter a new todo..."
        />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description..."
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.ID}>
            <strong>{todo.title}</strong>
            <p>{todo.description}</p>
            <button onClick={() => handleDelete(todo.ID)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
