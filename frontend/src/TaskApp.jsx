import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import TaskList from "./components/TaskList";
import TaskInput from "./components/TaskInput";

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

  const updateTask = async () => {
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
      <TaskInput
        title={title}
        setTitle={setTitle}
        editing={editing}
        addTask={addTask}
        updateTask={updateTask}
      />
      <div className="task-div">
        <div className="task-group">
          <h2 className="big-title">Yapılacak Görevlerin</h2>
          <TaskList
            tasks={activeTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        </div>
        <div className="task-group">
          <h2 className="big-title">Hallettiğin Görevlerin</h2>
          <TaskList
            tasks={completedTask}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskApp;
