import React from "react";
import TaskItem from "./TaskItem";
import "tailwindcss";


function TaskList({ tasks, deleteTask, toggleCompleted, editTask }) {
  return (
    <ul className="text-[#DFD0B8] font-normal">
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
