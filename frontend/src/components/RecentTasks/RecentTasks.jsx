import "./RecentTasks.css";

import {
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const RecentTasks = ({ tasks = [] }) => {
  return (
    <div className="recentTasks">

      <div className="recentHeader">

        <h2>Recent Tasks</h2>

        <button>View All</button>

      </div>

      {
        tasks.length === 0 ? (

          <div className="noTask">

            <p>No Recent Tasks</p>

          </div>

        ) : (

          tasks.map((task) => (

            <div
              key={task._id}
              className="recentTask"
            >

              <div className="taskInfo">

                <h3>{task.title}</h3>

                <p>{task.description}</p>

              </div>

              <div className="taskMeta">

                <span className={`priority ${task.priority}`}>

                  {task.priority}

                </span>

                <div className="date">

                  <FaCalendarAlt />

                  <span>{task.dueDate}</span>

                </div>

                <div
                  className={`status ${
                    task.status === "COMPLETE"
                      ? "complete"
                      : "pending"
                  }`}
                >

                  <FaCheckCircle />

                  <span>{task.status}</span>

                </div>

              </div>

            </div>

          ))

        )
      }

    </div>
  );
};

export default RecentTasks;