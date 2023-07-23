import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";
import "./scss and css/Updateproject.scss";

const Updateproject = (props) => {
  // const projectP = useLocation().state.project;
  const [project, setProject] = useState(
    JSON.parse(localStorage.getItem("project-edit"))
  );
  // let project = JSON.parse(localStorage.getItem("project-edit"));
  // const [editedProject, setEditedProject] = useState(
  //   JSON.parse(localStorage.getItem("project-edit"))
  // );
  const context = useContext(projectContext);
  const host_env = process.env.REACT_APP_HOST;
  const { editProject } = context;
  const { showAlert } = props;
  const [images, setImages] = useState(project?.images);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("project-edit")) {
      console.log("in useeffect update project", 21);
      navigate("/projects");
    } // eslint-disable-next-line
  }, [project]);

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
    // console.log(editedProject);
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

    if (editProject(formData)) {
      showAlert(
        '"' + project.pname + '" project is successfully updated.',
        "success"
      );

      // navigate("/projects");
    } else {
      showAlert("Error.", "danger");
    }
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
    // console.log(editedProject);
  };

  // ---------------------------------------------------------------- Delete Image.
  const deleteImage = async (projectId, image) => {
    console.log(projectId, image);
    props.setProgress(10);

    const response = await fetch(`${host_env}/api/projects/deleteimage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: projectId, image: image }),
    });
    try {
      props.setProgress(60);
      // Get data if there is.
      const json = await response.json();

      // If backend code worked well.
      if (json.success) {
        // Update image useState variable.
        setImages(images.filter((img) => img !== image));

        // Update project useState variable and localstorage. ---------
        let updatedProjectWImgs = project;
        updatedProjectWImgs.images = images.filter((img) => img !== image);
        console.log(updatedProjectWImgs);
        setProject(updatedProjectWImgs);
        localStorage.setItem(
          "project-edit",
          JSON.stringify(updatedProjectWImgs)
        );
        // -------------------------------------------

        console.log("Image deleted.", 96);
        props.setProgress(100);
        // return json.success;
      }
    } catch (error) {
      props.setProgress(100);
      console.log({ Error: error });
      // return false;
    }
  };

  const deleteImg = (image) => {
    // setImages(images.filter((img) => img !== image));
  };

  return (
    localStorage.getItem("project-edit") && (
      <>
        <div className="updateproject-container">
          {/* -------------------------------------------- All images */}
          <div className="udpate-images">
            <div className="udpate-heading">
              <input
                className="update-go-back"
                type="button"
                value="< Go Back"
                onClick={() => navigate("/projectitem")}
              />
              <h1>Update Project</h1>
            </div>
            <div className="update-all-images">
              {images?.length > 0
                ? images.map((image, key) => (
                    <div className="group-images" key={key}>
                      <div
                        className="project-images div-image"
                        key={key + "-image"}
                      >
                        <img src={`/static/uploads/projects/${image}`} alt="" />
                      </div>
                      <div
                        className="project-images div-icon"
                        onClick={() => {
                          props.showModal(
                            "Delete Image",
                            "Do you want to delete the image permanently? " +
                              image,
                            () => {
                              deleteImage(project._id, image) &&
                                deleteImg(image);
                            },
                            "Delete"
                          );
                        }}
                      >
                        <i className="fa-solid fa-trash-can" />
                      </div>
                    </div>
                  ))
                : "No images avaialable."}
            </div>
          </div>
          {/* ------------------------------------------------------------------ */}

          {/* ------------------------------------------------------- Update Details */}
          <div className="udpate-details">
            <h3>
              <b>Details</b>
            </h3>
            <ul>
              <li>
                <label>Show</label>
                {/* <input type="text" defaultValue={project.pname} /> */}
                <select
                  placeholder={"Show"}
                  id="show"
                  name="show"
                  onChange={onChange}
                  defaultValue={project?.show}
                >
                  <option value=""></option>
                  <option value={true}>Yes, visible to all.</option>
                  <option value={false}>No, visible only to company.</option>
                </select>
              </li>
              <li>
                <label>Project Name</label>
                <input type="text" defaultValue={project.pname} />
              </li>
              <li>
                <label>Description</label>
                <textarea defaultValue={project.description} />
              </li>
              <li>
                <label> Location (Required)</label>
                <input type="text" defaultValue={project.location} />
              </li>
              <li>
                <label>Year</label>
                <select
                  placeholder={"Year"}
                  id="year"
                  name="year"
                  onChange={onChange}
                  defaultValue={project.year}
                >
                  <option value=""></option>
                  {years.map((y, i) => (
                    <option value={y} key={i + "-year"}>
                      {y}
                    </option>
                  ))}
                </select>
                {/* <input type="text" defaultValue={project.year} /> */}
              </li>
              <li>
                <label>Category</label>
                <select
                  aria-label="Default select example"
                  placeholder={"Category"}
                  id="category"
                  name="category"
                  onChange={onChange}
                  defaultValue={project.category}
                >
                  <option value=""></option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Residential and Commercial">
                    Residential and Commercial
                  </option>
                </select>
                {/* <input type="text" defaultValue={project.category} /> */}
              </li>
              <li>
                <label>Progress</label>
                <select
                  aria-label="Default select"
                  placeholder={"Progress"}
                  id="inprogress"
                  name="inprogress"
                  onChange={onChange}
                  defaultValue={project.inprogress}
                >
                  <option value=""></option>
                  <option value="inprogress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {/* <input type="text" defaultValue={project.pname} /> */}
              </li>
            </ul>
            <div className="update-buttons">
              <button
                className="update-button"
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
                className="update-button"
                onClick={handleClick}
              >
                Update project
              </button>
              {/* <!-- Button trigger modal --> */}
              <button
                type="button"
                className="update-button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Updateproject;
