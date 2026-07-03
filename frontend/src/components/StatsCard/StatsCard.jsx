
import "./StatsCard.css";

const StatsCard = ({
  title,
  value,
  icon,
  color = "#4F46E5",
}) => {
  return (
    <div className="statsCard">

      <div className="statsLeft">

        <p>{title}</p>

        <h2>{value}</h2>

      </div>

      <div
        className="statsIcon"
        style={{ background: color }}
      >
        {icon}
      </div>

    </div>
  );
};

export default StatsCard;