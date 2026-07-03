import "./ProgressCard.css";

const ProgressCard = ({
  totalTasks = 20,
  completedTasks = 8,
  pendingTasks = 12,
  highPriority = 4,
}) => {

  const progress = Math.round(
    (completedTasks / totalTasks) * 100
  );

  return (
    <div className="progressCard">

      <div className="progressHeader">

        <h3>Today's Progress</h3>

        <span>{progress}%</span>

      </div>

      <div className="progressBar">

        <div
          className="progressFill"
          style={{ width: `${progress}%` }}
        ></div>

      </div>

      <div className="progressStats">

        <div className="progressItem">

          <span className="dot completed"></span>

          <p>Completed</p>

          <strong>{completedTasks}</strong>

        </div>

        <div className="progressItem">

          <span className="dot pending"></span>

          <p>Pending</p>

          <strong>{pendingTasks}</strong>

        </div>

        <div className="progressItem">

          <span className="dot high"></span>

          <p>High Priority</p>

          <strong>{highPriority}</strong>

        </div>

      </div>

    </div>
  );
};

export default ProgressCard;