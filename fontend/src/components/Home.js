import React from "react";
import { useNavigate } from "react-router-dom";
import background from "../images/background.jpg";

const Home = () => {
  let navigate = useNavigate();
  return (
    <div
      className="position-relative"
      style={{
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="position-absolute top-50 start-0 translate-middle-y font-link grid text-center">
        <h1
          className="mx-3 "
          style={{
            fontWeight: "500",
            fontSize: "90px",
            alignItems: " start",
          }}
        >
          T27 Architekten
        </h1>
        <button
          className="btn btn-outline-dark "
          onClick={() => navigate("/projects")}
        >
          Enter
        </button>
      </div>
      {/* <p
          style={{
            fontFamily: "Montserrat,sans-serif",
            fontSize: "22px",
            fontWeight: " 100",
          }}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex quam
          voluptatem officia modi amet dicta nisi, non harum molestiae eum iusto
          necessitatibus minus vitae maxime. Fugiat commodi dignissimos facere
          alias.
        </p> */}
    </div>
  );
};

export default Home;
