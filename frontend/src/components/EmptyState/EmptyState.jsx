import "./EmptyState.css";

import { FaClipboardList } from "react-icons/fa";

const EmptyState = ({
  title = "No Tasks Found",
  message = "Create your first task to get started.",
  buttonText = "Create Task",
  onClick,
}) => {
  return (
    <div className="emptyState">

      <div className="emptyIcon">
        <FaClipboardList />
      </div>

      <h2>{title}</h2>

      <p>{message}</p>



    </div>
  );
};

export default EmptyState;