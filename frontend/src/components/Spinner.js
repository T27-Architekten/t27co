import React from "react";

const Spinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        zIndex: "1000",
        position: "absolute",
        backgroundColor: "#37353ab3",
      }}
    >
      <img
        src="/Loader.gif"
        alt="loader"
        style={{
          width: "100px",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </div>
  );
};

export default Spinner;
