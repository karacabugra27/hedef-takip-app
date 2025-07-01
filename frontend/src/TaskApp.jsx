import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function TaskApp() {
  //taskları tut, titleları tut ,taskları getir, task ekle, ilk sayfa geldiğinde tasklar gelsin.

  const [title, setTitle] = useState("");

  const [activeTask, setActiveTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    //task listesini güncel halini getiriyoruz
    const response = await axios.get("http://localhost:8080/api/tasks");
    const sortedResponse = response.data
      .sort(
        (a, b) =>
          //gelen veriyi yani (response.data) eklenme tarihine sort yapıp sonrasında ters çeviriyoruz.
          //son eklenen üstte olacak
          new Date(a.createdAt) - new Date(b.createdAt)
      )
      .reverse();
    const activeTask = sortedResponse.filter((task) => !task.completed);
    const completedTask = sortedResponse.filter((task) => task.completed);
    setActiveTask(activeTask);
    setCompletedTask(completedTask);
  };

  const addTask = async () => {
    if (title.trim() == "") {
      alert("Bir hedef girmelisin!");
      return;
    }
    await axios.post("http://localhost:8080/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    fetchTasks();
  };

  const editTask = (task) => {
    setEditing(task);
    setTitle(task.title);
  };

  const updateTask = async (task) => {
    if (!editing) return;
    const newUpdatedTask = { ...editing, title }; //editlenecek task'in title verisini getir.
    await axios.put(
      `http://localhost:8080/api/tasks/${editing.id}`,
      newUpdatedTask
    );
    setEditing(null);
    setTitle("");
    fetchTasks();
  };

  const toggleCompleted = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await axios.put(`http://localhost:8080/api/tasks/${task.id}`, updatedTask);
    fetchTasks();
  };

  useEffect(() => {
    setEditing(null);
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (editing) {
              updateTask();
            } else {
              addTask();
            }
          }
        }}
        placeholder="Hedef Yaz"
      />

      <div className="button-div">
        <button
          className="button"
          onClick={() => {
            if (editing) {
              updateTask();
            } else {
              addTask();
            }
          }}
        >
          {editing ? "Güncelle" : "Ekle"}
        </button>
      </div>

      <div className="task-div">
        <div className="task-group">
          <h2 className="big-title">Yapılacak Görevlerin</h2>
          <ul className="ul">
            {activeTask.map((task) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    toggleCompleted(task);
                  }}
                />
                {task.title +
                  " " +
                  new Date(task.createdAt).toLocaleTimeString()}
                <button
                  className="button-delete"
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  X
                </button>
                <button
                  className="button-edit"
                  onClick={() => {
                    editTask(task);
                  }}
                >
                  .
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="task-group">
          <h2 className="big-title">Hallettiğin Görevlerin</h2>
          <ul className="ul">
            {completedTask.map((task) => (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    toggleCompleted(task);
                  }}
                />
                {task.title +
                  " " +
                  new Date(task.createdAt).toLocaleTimeString()}
                <button
                  className="button-delete"
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                >
                  X
                </button>
                <button
                  className="button-edit"
                  onClick={() => {
                    editTask(task);
                  }}
                >
                  .
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
