import React from "react";
import background from "../images/list1.jpg";

const Projects = () => {
  return (
    <div>
      <div className="float-start p-1 mx-4 sticky-top">
        <h5 className="theme-cards__title">Projects</h5>
        <p>Our popular projects</p>
      </div>
      <div className="container col-5 ">
        <ui>
          <li className="card row my-4">
            <img src={background} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Description</p>
            </div>
          </li>
          <li className="card row  my-4">
            <img src={background} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Description</p>
            </div>
          </li>
        </ui>
      </div>
    </div>
  );
};

export default Projects;
