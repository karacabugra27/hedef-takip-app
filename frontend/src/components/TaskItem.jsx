import React from "react";
import "tailwindcss";
import { MdDelete, MdEdit } from "react-icons/md";

function TaskItem({ task, deleteTask, toggleCompleted, editTask }) {
  return (
    <div>
      <li
        className="flex items-center justify-between gap-2 px-4 py-1 border-b border-gray-200"
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        <div className="flex items-center gap-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(task)}
            className="cursor-pointer"
          />
          <span>
            {task.title + " "}
            <span className="text-sm text-amber-200">
              {new Date(task.createdAt).toLocaleTimeString()}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="text-red-300 rounded-full hover:text-red-400 hover:scale-110 cursor-pointer transition-all"
            onClick={() => deleteTask(task.id)}
          >
            <MdDelete size={18} />
          </button>

          <button
            className="text-gray-100 rounded-full hover:text-gray-200 hover:scale-110 cursor-pointer transition-all"
            onClick={() => editTask(task)}
          >
            <MdEdit size={18} />
          </button>
        </div>
      </li>
    </div>
  );
}

export default TaskItem;
