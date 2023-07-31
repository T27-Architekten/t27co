import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  return (
    <div className="position-relative">
      <h1
        data-text="T27 Architekten"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/projects")}
      >
        <span>T27 Architekten</span>
      </h1>
    </div>
  );
};

export default Home;
