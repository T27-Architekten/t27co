import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";

const Addproject = (props) => {
  const host_env = process.env.REACT_APP_HOST;
  const context = useContext(projectContext);
  const { addProject, checkproject } = context;
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
  const [images, setImages] = useState([]);
  // console.log(project);
  // console.log("images = " + images);
  // Year range for the project.
  let years = [];
  const allYears = () => {
    const currentYear = 2000;
    let startYear = new Date().getFullYear();
    while (startYear >= currentYear) {
      years.push(startYear--);
    }
  };
  // Calling the year funciton.
  allYears();

  //
  const handleCheck = async (e, addProject) => {
    e.preventDefault();
    const checkProject = await checkproject(project.pname);
    if (checkProject.project.length > 0) {
      props.showAlert("Please choose another name for the project.", "danger");
      return false;
    } else {
      if (!addProject)
        props.showAlert("You can choose this name for the project.", "success");
      return true;
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pname", project.pname);
    formData.append("description", project.description);
    formData.append("location", project.location);
    formData.append("year", project.year);
    formData.append("category", project.category);
    formData.append("inprogress", project.inprogress);
    // formData.append("images", images);
    // images.map((image) => formData.append("images", image));
    for (let x = 0; x < images.length; x++) {
      if (
        images[x].type !== "image/png" &&
        images[x].type !== "image/jpg" &&
        images[x].type !== "image/jpeg"
      ) {
        return showAlert(
          "The image format should be png, jpg or jpeg.",
          "danger"
        );
      }
      formData.append("images", images[x]);
    }
    console.log(formData.getAll("images"));
    if (await handleCheck(e, true)) {
      addProject(formData);
    }

    setProject({
      pname: "",
      description: "",
      location: "",
      year: "",
      category: "",
      inprogress: "",
    });
    setImages([]);
    document.getElementById("images").value = "";
    // navigate("/projects");
  };
  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
    // console.log(document.getElementById("images"));
  };

  return (
    <div className="container col-md-5 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="d-flex justify-content-evenly">Add a project</h2>
      <form className=" my-3">
        <div className="mb-3">
          <div className=" row g-0 text-center ">
            <div className="form-floating col-sm-9">
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
            <div className="col col-form-label">
              <button
                type="button"
                onClick={(e) => handleCheck(e, false)}
                className="btn btn-outline-success"
              >
                Check
              </button>
            </div>
          </div>
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
            style={{ height: "80px" }}
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
          <select
            className="form-select"
            aria-label="Default select"
            placeholder={"Year"}
            id="year"
            name="year"
            onChange={onChange}
            value={project.year}
          >
            <option value=""></option>
            {years.map((y, i) => (
              <option value={y} key={i}>
                {y}
              </option>
            ))}
          </select>
          <label htmlFor="year" className="form-label">
            Year
          </label>
        </div>
        {/* <div className="form-floating mb-3">
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
        </div> */}
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
            placeholder="Category"
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
        <div className=" mb-3  ">
          <div className="mb-3 row g-3 ">
            <label htmlFor="formFileLg" className="col-form-label  col-sm-3 ">
              Upload Images
            </label>
            <div className="col-sm-9">
              <input
                className="form-control"
                onChange={(e) => setImages(e.target.files)}
                id="images"
                type="file"
                name="images"
                multiple
              />
            </div>
          </div>
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
