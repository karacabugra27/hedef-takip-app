import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:8080/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main-div">
      <h2 className="title-font">Hedef Takip</h2>

      <input
        className="input"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Görev Yaz"
      />

      <div className="button-div">
        <button className="button" onClick={addTask}>
          Ekle
        </button>
      </div>

      <div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}> ✅ {task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskApp;
