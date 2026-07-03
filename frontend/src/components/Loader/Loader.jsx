import "./Loader.css";

const Loader = ({
  size = "60px",
  text = "Loading...",
}) => {
  return (
    <div className="loaderContainer">

      <div
        className="spinner"
        style={{
          width: size,
          height: size,
        }}
      ></div>

      <p>{text}</p>

    </div>
  );
};

export default Loader;