import React from "react";
import "tailwindcss";
import "../App.css";
import { MdEditNote } from "react-icons/md";
import { MdAdd } from "react-icons/md";

function TaskInput({ title, setTitle, editing, addTask, updateTask }) {
  const handleSubmit = () => {
    if (editing) {
      updateTask();
    } else {
      addTask();
    }
  };

  return (
    <div className="flex items-center gap-3 my-2">
      <input
        className="h-7.5 w-75 border-b pl-3 border-[#C0C9EE] outline-none cursor-pointer rounded-full bg-gray-50 p-2 text-slate-500 focus:ring-2 focus:[#393E46] transition"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit;
          }
        }}
        placeholder="Hedef Yaz"
      />

      <button
        className="h-auto w-auto bg-[#4c4e50] border-none outline-none cursor-pointer rounded-full p-1 hover:scale-110 text-[#C0C9EE]"
        onClick={handleSubmit}
      >
        {editing ? <MdEditNote /> : <MdAdd />}
      </button>
    </div>
  );
}

export default TaskInput;
