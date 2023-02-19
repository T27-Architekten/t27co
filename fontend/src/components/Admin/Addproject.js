import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";

const Addproject = (props) => {
  const context = useContext(projectContext);
  const { addProject } = context;
  const navigate = useNavigate();
  const { showAlert } = props;
  const [project, setProject] = useState({
    pname: "",
    description: "",
    location: "",
    year: "",
    category: "",
    inprogress: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    props.setProgress(10);
    addProject(
      project.pname,
      project.description,
      project.location,
      project.year,
      project.category,
      project.inprogress
    );
    props.setProgress(50);
    showAlert(
      '"' + project.pname + '" project is successfully added to your projects.',
      "success"
    );
    props.setProgress(70);
    setProject({
      pname: "",
      description: "",
      location: "",
      year: "",
      category: "",
      inprogress: "",
    });
    navigate("/projects");
    props.setProgress(100);
  };
  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  return (
    <div className="container col-md-5 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="d-flex justify-content-evenly">Add a project</h2>
      <form className=" my-3">
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
          <label htmlFor="pname " className="form-label">
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
            Location
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
            Year
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
            aria-label="Default select"
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
        <div className="d-flex justify-content-evenly">
          <button
            disabled={
              project.pname.length < 3 ||
              project.location.length < 3 ||
              project.year.length < 4
            }
            className="btn btn-warning"
            onClick={handleClick}
          >
            Add project
          </button>
          <button
            className="btn btn-warning"
            onClick={() => navigate("/projects")}
          >
            All Projects
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addproject;
