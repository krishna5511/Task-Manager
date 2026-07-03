import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h1>404</h1>

      <p>Page Not Found</p>

      <Link to="/dashboard">Go Back</Link>
    </div>
  );
};

export default NotFound;