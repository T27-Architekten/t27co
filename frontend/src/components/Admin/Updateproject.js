import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";

const Updateproject = (props) => {
  const projectP = useLocation().state.project;
  const [project, setProject] = useState(projectP);
  const context = useContext(projectContext);
  const { editProject, deleteProject } = context;
  const { showAlert } = props;
  const [images, setImages] = useState(projectP.images);

  const navigate = useNavigate();
  // console.log(images);
  const handleClick = (e) => {
    e.preventDefault();
    // console.log(project);
    // editProject(
    //   project._id,
    //   project.pname,
    //   project.description,
    //   project.location,
    //   project.year,
    //   project.category,
    //   project.inprogress,
    //   project.show
    // );

    const formData = new FormData();
    formData.append("_id", project._id);
    formData.append("pname", project.pname);
    formData.append("description", project.description);
    formData.append("location", project.location);
    formData.append("year", project.year);
    formData.append("category", project.category);
    formData.append("inprogress", project.inprogress);
    formData.append("show", project.show);
    // formData.append("images", images);
    // images.map((image) => formData.append("images", image));
    for (let x = 0; x < images.length; x++) {
      if (
        images[x].endsWith("image/png") ||
        images[x].endsWith("image/jpg") ||
        images[x].endsWith("image/jpeg")
      ) {
        return showAlert(
          "The image format should be png, jpg or jpeg.",
          "danger"
        );
      } else {
        formData.append("images", images[x]);
      }
    }

    editProject(formData);
    showAlert(
      '"' + project.pname + '" project is successfully updated.',
      "success"
    );
    navigate("/projects");
  };

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

  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const deleteImage = (image) => {
    setImages(images.filter((img) => img != image));
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
                  deleteProject(project._id);
                  showAlert(
                    '"' + project.pname + '" note is successfully deleted.',
                    "success"
                  );
                  navigate("/projects");
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
      <div className="container text-center mt-5">
        {/* <div className="container col-md-5 mt-5  p-3 mb-5 "> */}
        {/* <div className="my-5"> */}
        <div className=" row justify-content-evenly">
          <div className="col-5 mt-4">
            <h2 className=" ">Update the project</h2>
            <div className="container text-center mt-5">
              <div className=" mb-3">
                {/* --------------------- Images --------------------- */}
                {images.length > 0
                  ? images.map((image, key) => (
                      <div
                        className="card w-50 col p-2"
                        key={key}
                        // style={{ width: "18rem" }}
                      >
                        <img
                          src={`/static/${image}`}
                          className=" "
                          alt="Alt image"
                        />
                        <div className="card-body">
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              deleteImage(image);
                              // Show alert to press update button to make changes.
                              showAlert(
                                "Click update button to make changes permanent.",
                                "warning"
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))
                  : "No images avaialable."}
                <img className="col" src="" />
                {/* <div class="col">col</div>
                <div class="col">col</div>
                <div class="col">col</div>
                <div class="col">col</div> */}
              </div>
            </div>
          </div>
          <div className="col-4 mt-4">
            <div className="form-floating mb-4 mt-2">
              <select
                className="form-select"
                aria-label="Default select"
                placeholder={"Show"}
                id="show"
                name="show"
                onChange={onChange}
                value={project.show}
              >
                <option value=""></option>
                <option value={true}>Yes, visible to all.</option>
                <option value={false}>No, visible only to company.</option>
              </select>
              <label htmlFor="show" className="form-label">
                Show
              </label>
            </div>
            <div className="form-floating mb-4">
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
            <div className="form-floating mb-4">
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
            <div className="form-floating mb-4">
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
            <div className="form-floating mb-4">
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
              Year (Required)
            </label>
          </div> */}
            <div className="form-floating mb-4">
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
            <div className="form-floating mb-4">
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
                Cancel
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Updateproject;
