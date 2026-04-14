import React, { useState } from "react";
import "./todo.css";

function Todo() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setList([...list, { text: task, done: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const toggleDone = (index) => {
    const newList = [...list];
    newList[index].done = !newList[index].done;
    setList(newList);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  const completed = list.filter((t) => t.done).length;

  return (
    <div className="todo-page">
      <div className="todo-card">

        <div className="todo-header">
          <h2 className="todo-title">To-Do List</h2>
          <span className="todo-count">
            {completed}/{list.length} done
          </span>
        </div>

        <div className="todo-input-row">
          <input
            className="todo-input"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
          />
          <button className="todo-add-btn" onClick={addTask}>Add</button>
        </div>

        {list.length === 0 && (
          <p className="todo-empty">No tasks yet. Add one above.</p>
        )}

        <ul className="todo-list">
          {list.map((item, index) => (
            <li className={`todo-item ${item.done ? "done" : ""}`} key={index}>
              <input
                className="todo-checkbox"
                type="checkbox"
                checked={item.done}
                onChange={() => toggleDone(index)}
              />
              <span className="todo-text">{item.text}</span>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Todo;