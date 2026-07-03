import "./TaskCard.css";

import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  dueDate,
  completedSubtasks = 0,
  totalSubtasks = 0,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="taskCard">

      <div className="taskTop">

        <h2>{title}</h2>

        <span className={`priority ${priority}`}>
          {priority}
        </span>

      </div>

      <p className="description">
        {description}
      </p>

      <div className="subTaskProgress">

        <span>
          {completedSubtasks}/{totalSubtasks} Subtasks Completed
        </span>

        <div className="progress">

          <div
            className="fill"
            style={{
              width: `${
                totalSubtasks === 0
                  ? 0
                  : (completedSubtasks / totalSubtasks) * 100
              }%`,
            }}
          ></div>

        </div>

      </div>

      <div className="taskBottom">

        <div className="dueDate">

          <FaCalendarAlt />

          <span>{dueDate}</span>

        </div>

        <div
          className={`status ${
            status === "COMPLETE"
              ? "complete"
              : "pending"
          }`}
        >

          <FaCheckCircle />

          {status}

        </div>

      </div>

      <div className="taskActions">

        <button
          className="editBtn"
          onClick={onEdit}
        >
          <FaEdit />

          Edit

        </button>

        <button
          className="deleteBtn"
          onClick={onDelete}
        >
          <FaTrash />

          Delete

        </button>

      </div>

    </div>
  );
};

export default TaskCard;