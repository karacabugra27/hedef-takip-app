import React from "react";

function TaskItem({ task, deleteTask, toggleCompleted, editTask }) {
  return (
    <li
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
      {task.title + " " + new Date(task.createdAt).toLocaleTimeString()}
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
  );
}

export default TaskItem;
