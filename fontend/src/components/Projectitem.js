import React from "react";
import { Link } from "react-router-dom";
// import React, { useContext } from "react";
// import projectContext from "../context/projects/projectContext";

const ProjectItem = (props) => {
  //   const context = useContext(projectContext);
  //   const { deleteNote } = context;
  //   const { showAlert } = props;
  const { project } = props;
  // console.log(project);
  // let navigate = useNavigate();
  return (
    <div className="col-md-3 ">
      <div className="card my-3">
        <div className="card-body">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{project.pname}</h5>
            <p className="card-text">{project.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Location: </b>
              {project.location}
            </li>
            <li className="list-group-item">
              <b>Year: </b>
              {project.year}
            </li>
            <li className="list-group-item">
              <b>Category: </b>
              {project.category}
            </li>
            <li className="list-group-item">
              <b>Progress: </b>
              {project.inprogress}
            </li>
            <li className="list-group-item">
              <b>Last edited by: </b>
              {project.alteredby}
            </li>
            <li className="list-group-item d-flex justify-content-evenly">
              <Link
                className="btn btn-outline-secondary"
                to={{
                  pathname: "/updateproject",
                }}
                state={{ project: project }}
              >
                Edit
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="mb-3">
        <label htmlFor="pname" className="form-label">
          Project name (minimum of at least 3 chararacters)
        </label>
        <input
          type="text"
          className="form-control"
          id="pname"
          name="pname"
          aria-describedby="emailHelp"
          onChange={onChange}
          placeholder="Project Name. It must be a minimum of at least 3 chararacters."
          minLength="3"
          value={project.pname}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          type="text"
          value={project.description}
          className="form-control"
          id="description"
          name="description"
          onChange={onChange}
          placeholder="Description"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          placeholder={"Location. It must be a minimum of 3 characters."}
          type="text"
          minLength="3"
          className="form-control"
          id="location"
          name="location"
          onChange={onChange}
          value={project.location}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          placeholder={"Year of initiation"}
          type="number"
          minLength="3"
          className="form-control"
          id="year"
          name="year"
          onChange={onChange}
          value={project.year}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          placeholder={"Category"}
          type="text"
          className="form-control"
          id="category"
          name="category"
          onChange={onChange}
          value={project.category}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="inprogress" className="form-label">
          Progress
        </label>
        <input
          placeholder={"Progress"}
          type="text"
          className="form-control"
          id="inprogress"
          name="inprogress"
          onChange={onChange}
          value={project.inprogress}
        />
      </div> */}
    </div>
  );
};

export default ProjectItem;
