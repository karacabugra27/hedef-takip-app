import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleCompleted, editTask }) {
  return (
    <ul className="ul">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
