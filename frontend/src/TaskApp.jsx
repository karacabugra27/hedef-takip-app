import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function TaskApp() {
  //taskları tut, titleları tut ,taskları getir, task ekle, ilk sayfa geldiğinde tasklar gelsin.

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

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
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
            <li key={task.id}>
              {" "}
              ✅ {task.title}
              <button
                className="button-delete"
                onClick={() => {
                  deleteTask(task.id);
                }}
              >X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskApp;
