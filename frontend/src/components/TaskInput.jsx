import React from "react";
import "../App.css";

function TaskInput({ title, setTitle, editing, addTask, updateTask }) {
  const handleSubmit = () => {
    if (editing) {
      updateTask();
    } else {
      addTask();
    }
  };

  return (
    <>
      <input
        className="input"
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

      <div className="button-div">
        <button className="button" onClick={handleSubmit}>
          {editing ? "Güncelle" : "Ekle"}
        </button>
      </div>
    </>
  );
}

export default TaskInput;
