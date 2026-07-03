import "./TaskForm.css";

import { useEffect, useState } from "react";

const TaskForm = ({
  initialData = {},
  onSubmit,
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
    dueDate: "",
  });

  // Update form whenever editing task changes
  useEffect(() => {

    setFormData({

      title: initialData.title || "",

      description: initialData.description || "",

      priority: initialData.priority || "MEDIUM",

      status: initialData.status || "PENDING",

      dueDate: initialData.dueDate
        ? new Date(initialData.dueDate)
            .toISOString()
            .split("T")[0]
        : "",

    });

  }, [initialData]);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  // Submit Form
  const handleSubmit = (e) => {

    e.preventDefault();

    onSubmit(formData);

  };

  return (

    <form
      className="taskForm"
      onSubmit={handleSubmit}
    >

      <div className="formGroup">

        <label>Title</label>

        <input
          type="text"
          name="title"
          placeholder="Enter Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

      </div>

      <div className="formGroup">

        <label>Description</label>

        <textarea
          name="description"
          placeholder="Task Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />

      </div>

      <div className="formRow">

        <div className="formGroup">

          <label>Priority</label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >

            <option value="LOW">Low</option>

            <option value="MEDIUM">Medium</option>

            <option value="HIGH">High</option>

          </select>

        </div>

        <div className="formGroup">

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="PENDING">Pending</option>

            <option value="COMPLETE">Complete</option>

          </select>

        </div>

      </div>

      <div className="formGroup">

        <label>Due Date</label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />

      </div>

      <button type="submit">

        {initialData?._id
          ? "Update Task"
          : "Create Task"}

      </button>

    </form>

  );

};

export default TaskForm;