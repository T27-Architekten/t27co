import React from "react";
import "./scss and css/Projectitem.scss";
// import "./css/NotFound.css";

const NotFound = (props) => {
  const nfContainer = {
    width: "80%",
    // height: "100vh",
    margin: "15% 10% 0",
    textAlign: "center",
    color: "#d1b08f",
    display: "flex",
    flexDirection: "column",
    justifyContent: " space-evenly",
  };
  return (
    <div style={nfContainer}>
      <h1 style={{ paddingBottom: "30px" }}> Page not found.</h1>

      <i
        className="fa-regular fa-face-frown fa-9x"
        style={{ paddingBottom: "30px" }}
      ></i>
      <p style={{ paddingBottom: "10px" }}>
        The page you are looking for doesn't exist or an other error occured.{" "}
        <br />
        Go back, or head over to the home page to choose a new direction.
      </p>
    </div>
  );
};

export default NotFound;
