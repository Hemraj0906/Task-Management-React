// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./AddTaskForm.css";

const UpdateTaskForm = ({ closeForm, updateTask, task }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(task.id, taskTitle, priority, dueDate);
    closeForm();
  };

  return (
    <div className="update-task-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Task Title</label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter new task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Update Task</button>
          <button type="button" onClick={closeForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
