import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";

const Updateproject = (props) => {
  const projectP = useLocation().state.project;
  const [project, setProject] = useState(projectP);
  const context = useContext(projectContext);
  const { editProject, deleteProject } = context;
  const { showAlert } = props;

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    props.setProgress(10);
    editProject(
      project._id,
      project.pname,
      project.description,
      project.location,
      project.year,
      project.category,
      project.inprogress
    );
    props.setProgress(70);
    showAlert(
      '"' + project.pname + '" project is successfully updated.',
      "success"
    );
    navigate("/projects");
    props.setProgress(10);
  };

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <!-- Delete Project Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Delete project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Do you want delete the '{project.pname}' project permanentlty.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  props.setProgress(10);
                  deleteProject(project._id);
                  props.setProgress(750);
                  showAlert(
                    '"' + project.pname + '" note is successfully deleted.',
                    "success"
                  );
                  props.setProgress(70);
                  navigate("/projects");
                  props.setProgress(100);
                }}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------- */}
      {/* Update project */}
      <div className="container col-md-5 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
        <h2 className="d-flex justify-content-evenly">Add a project</h2>
        <form className="my-3">
          <div className="form-floating mb-3">
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
            <label htmlFor="pname" className="form-label">
              Project name (minimum of at least 3 chararacters)
            </label>
          </div>
          <div className="form-floating mb-3">
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
            <label htmlFor="description" className="form-label">
              Description
            </label>
          </div>
          <div className="form-floating mb-3">
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
            <label htmlFor="location" className="form-label">
              Location (Required)
            </label>
          </div>
          <div className="form-floating mb-3">
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
            <label htmlFor="year" className="form-label">
              Year (Required)
            </label>
          </div>
          <div className="form-floating mb-3">
            {/* <input
              placeholder={"Category"}
              type="text"
              className="form-control"
              id="category"
              name="category"
              onChange={onChange}
              value={project.category}
            /> */}
            <select
              className="form-select"
              aria-label="Default select example"
              placeholder={"Category"}
              id="category"
              name="category"
              onChange={onChange}
              value={project.category}
            >
              <option value=""></option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential and Commercial">
                Residential and Commercial
              </option>
            </select>
            <label htmlFor="category" className="form-label">
              Category
            </label>
          </div>
          <div className="form-floating mb-3">
            {/* <input
              placeholder={"Progress"}
              type="text"
              className="form-control"
              id="inprogress"
              name="inprogress"
              onChange={onChange}
              value={project.inprogress}
            /> */}
            <select
              className="form-select"
              aria-label="Default select"
              placeholder={"Progress"}
              id="inprogress"
              name="inprogress"
              onChange={onChange}
              value={project.inprogress}
            >
              <option value=""></option>
              <option value="inprogress">In progress</option>
              <option value="Completed">Completed</option>
            </select>
            <label htmlFor="inprogress" className="form-label">
              Progress
            </label>
          </div>
          <div className="d-flex justify-content-evenly ">
            <button
              className="btn btn-warning"
              onClick={() => navigate("/projects")}
            >
              Back
            </button>
            <button
              disabled={
                project.pname.length < 3 ||
                project.location.length < 3 ||
                project.year.length < 4
              }
              className="btn btn-warning"
              onClick={handleClick}
            >
              Update project
            </button>
            {/* <!-- Button trigger modal --> */}
            <button
              type="button"
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Updateproject;
