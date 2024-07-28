// eslint-disable-next-line no-unused-vars
import React from "react";
import "./TaskCard.css";

const pipelineColors = {
  "to-do": "bg-blue-500",
  "in-progress": "bg-yellow-500",
  "qa-review": "bg-red-500",
  "done": "bg-green-500",
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case "High":
      return "priority-high";
    case "Medium":
      return "priority-medium";
    case "Low":
      return "priority-low";
    default:
      return "";
  }
};

const TaskCard = ({ task, openUpdateForm, deleteTask }) => {
  return (
    <div className="task-card">
      <div className={`strip ${pipelineColors[task.columnId]}`}></div>
      <div className="task">
        <h3>{task.title}</h3>

        {/* <p className="priority">Priority: {task.priority}</p> */}
        <p className={`priority ${getPriorityClass(task.priority)}`}>
          Priority: {task.priority}
        </p>
        <p className="due-date">Due Date: {task.dueDate}</p>
      </div>
      <button onClick={() => openUpdateForm(task)}>Update</button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
