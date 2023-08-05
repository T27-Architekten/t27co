import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectContext from "../../context/projects/projectContext";
import "./scss and css/Updateproject.scss";
import "./../scss and css/Modal.scss";

const Updateproject = (props) => {
  // const projectP = useLocation().state.project;
  const [project, setProject] = useState(
    JSON.parse(localStorage.getItem("project-edit"))
  );
  const context = useContext(projectContext);
  const host_env = process.env.REACT_APP_HOST;
  const { editProject, deleteProject } = context;
  const { showAlert } = props;
  const [images, setImages] = useState(project?.images);
  const navigate = useNavigate();
  const [addImageModal, setAddImageModal] = useState(false);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("project-edit")) {
      navigate("/projects");
    } // eslint-disable-next-line
  }, []);

  // Event trigger method for add or changing text in input fields.
  const onChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  // ---------------------------------------------------------------- Update project.
  const handleClick = (e) => {
    e.preventDefault();

    const success = editProject(project);
    if (success) {
      showAlert(
        ' ✔️ "' + project.pname + '" project is successfully updated.',
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

  // ---------------------------------------------------------------- Delete Image.
  const handleDeleteImage = async (projectId, image) => {
    // console.log(projectId, image);
    props.setProgress(10);

    // fetch api for deleting image.
    const response = await fetch(`${host_env}/api/projects/deleteimage`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: projectId, images: image }),
    });

    // Try catch for handling errors.
    try {
      // props.setProgress() for progress bar.
      props.setProgress(60);

      // Get response after running fetch api method.
      const json = await response.json();

      // If backend code worked well.
      if (json.success) {
        // Update image useState variable.
        setImages(images.filter((img) => img !== image));

        // Update project useState variable and localstorage. ---------
        let updatedProjectWImgs = project;
        updatedProjectWImgs.images = images.filter((img) => img !== image);
        // console.log(updatedProjectWImgs);
        setProject(updatedProjectWImgs);
        localStorage.setItem(
          "project-edit",
          JSON.stringify(updatedProjectWImgs)
        );
        // -------------------------------------------
        props.showAlert("The image has been successfully deleted.");
        // console.log("Image deleted.", 96);
        props.setProgress(100);
        // return json.success;
      }
    } catch (error) {
      props.setProgress(100);
      console.log({ Error: error });
      // return false;
    }
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    props.setProgress(10);

    const formData = new FormData();
    formData.append("id", project._id);
    formData.append("pname", project.pname);

    for (let x = 0; x < newImages.length; x++) {
      if (
        newImages[x].type !== "image/png" &&
        newImages[x].type !== "image/jpg" &&
        newImages[x].type !== "image/jpeg"
      ) {
        return showAlert(
          "The image format should be png, jpg or jpeg.",
          "danger"
        );
      }
      formData.append("images", newImages[x]);
    }

    const response = await fetch(`${host_env}/api/projects/addimages`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    // console.log(newImages, 121);

    props.setProgress(50);

    try {
      const json = await response.json();
      props.setProgress(60);

      if (json.success) {
        // console.log(json.images);

        // Update images of the page.
        setImages([...json.images, ...images]);

        // Update project for localStorage.
        localStorage.setItem(
          "project-edit",
          JSON.stringify({
            ...project,
            images: [...json.images, ...images],
          })
        );
        setProject({ ...project, images: [...json.images, ...images] });

        // console.log(JSON.parse(localStorage.getItem("project-edit")));

        setNewImages([]);
        setAddImageModal(false);
        // console.log(updatedProject, 169);
        props.setProgress(100);
      }
    } catch (error) {
      props.setProgress(100);
      console.log({ Error: error });
    }
  };

  return (
    localStorage.getItem("project-edit") && (
      <>
        {/* ------------------------------------------- Add images */}
        {addImageModal && (
          <div className="modal-window">
            <div>
              <h1>
                <i
                  className="fa-solid fa-square-plus"
                  style={{ color: " #2c3337" }}
                />
                &nbsp; Add Images
              </h1>
              <hr />
              {/* ----------------------------------------- content */}
              <input
                type="file"
                name="newImages"
                onChange={(e) => setNewImages(e.target.files)}
                placeholder="Add New Images"
                multiple
              />
              <div className="action-modal-bttns">
                <button
                  className="action-button"
                  onClick={(e) => {
                    handleAddImage(e);
                  }}
                >
                  Upload
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setAddImageModal(false);
                    setNewImages([]);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ---------------------------------------------------------------- */}

        <div className="updateproject-container">
          {/* -------------------------------------------- All images */}
          <div className="udpate-images-background">
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
                {/* ----------------------------------------- Add image to existing project. */}
                <button
                  className="update-button add-image-btn"
                  name="newImages"
                  onClick={() => setAddImageModal(true)}
                >
                  +
                </button>
                {images?.length > 0
                  ? images.map((image, key) => (
                      <div className="group-images" key={key}>
                        <div className="project-images " key={key + "-image"}>
                          <img
                            src={`/static/uploads/projects/${image}`}
                            alt=""
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              props.showCarousel(images, key);
                            }}
                          />
                          <i
                            className="fa-solid fa-trash-can div-icon"
                            key={key + "-i"}
                            onClick={() => {
                              props.showModal(
                                "Delete Image",
                                "Do you want to delete the image permanently? " +
                                  image,
                                () => {
                                  handleDeleteImage(project._id, image);
                                },
                                "Delete"
                              );
                            }}
                          />
                        </div>
                        {/* <div className="project-images "></div> */}
                      </div>
                    ))
                  : "No images avaialable."}
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------ */}

          {/* ------------------------------------------------------- Update Details */}
          <div className="udpate-details-background">
            <div className="udpate-details">
              {/* <h3>
                <b>Details</b>
              </h3> */}
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
                  <input
                    type="text"
                    name="pname"
                    defaultValue={project.pname}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label>Description</label>
                  <textarea
                    name="description"
                    defaultValue={project.description}
                    onChange={onChange}
                  />
                </li>
                <li>
                  <label> Location (Required)</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={project.location}
                    onChange={onChange}
                  />
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
                {/* -------------------------------- Update Button */}
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

                {/* ------------------------------------------- Delete whole project. */}
                <button
                  className="update-button"
                  onClick={() =>
                    props.showModal(
                      "Delete project",
                      "Do you want to delete the project",
                      () => {
                        deleteProject(project._id, images);
                        navigate("/projects");
                      },
                      "Delete"
                    )
                  }
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Updateproject;
