// src/App.js
import React, { useState, useEffect } from 'react';
import "./App.css"

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now().toString(), 
        text: inputValue.trim(),
      };
      setTodos([...todos, newTodo]);
      setInputValue("");  
    } else {
      alert("Please enter a task.");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, oldValue) => {
    const updatedValue = prompt("Enter updated value:");
    if (updatedValue && updatedValue !== oldValue) {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, text: updatedValue } : todo
      );
      setTodos(updatedTodos);
    }
  };

  const handleDeleteAllTodos = () => {
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter items..."
        />
        <button onClick={handleAddTodo}>Add Item</button>
        <button onClick={handleDeleteAllTodos}>Delete All Items</button>
      </div>

      <ul id="list">
        {todos.map((todo) => (
          <li key={todo.id} data-id={todo.id}>
            {todo.text}
            <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
            <button className="edit-btn" onClick={() => handleEditTodo(todo.id, todo.text)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
