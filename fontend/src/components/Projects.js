import React, { useContext, useEffect } from "react";
import projectContext from "../context/projects/projectContext";
// import background from "../images/list1.jpg";
import Projectitem from "../components/Projectitem";
const Projects = (props) => {
  const context = useContext(projectContext);
  const { projects, getProjects } = context;
  const { showAlert } = props;

  useEffect(() => {
    //  if (localStorage.getItem("token")) {
    props.setProgress(10);
    getProjects();
    props.setProgress(100);
    //  } else {
    //    navigate("/login");
    //  }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row  my-3  shadow p-3 mb-5 bg-body-tertiary rounded ">
        <div className="d-flex justify-content-evenly">
          <h2>All Projects ({projects.length})</h2>
        </div>
        <div className="container">
          {projects.length === 0 && "No notes available."}
        </div>
        {projects.map((project) => {
          return (
            <Projectitem
              project={project}
              key={project._id}
              showAlert={showAlert}
            />
          );
        })}

        {/* <div className="float-start p-1 mx-4 sticky-top">
        <h5 className="theme-cards__title">Projects</h5>
        <p>Our popular projects</p>
      </div>
      <div className="container col-5 ">
        <ul>
          <li className="card row my-4">
            <img
              src={background}
              className="card-img-top object-fit-cover border rounded"
              alt="..."
            />
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
        </ul>
      </div> */}
      </div>
    </div>
  );
};

export default Projects;
