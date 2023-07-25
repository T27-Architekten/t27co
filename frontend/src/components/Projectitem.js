import React from "react";
import { useNavigate } from "react-router-dom";
import "./scss and css/Projectitem.scss";

const Projectitem = (props) => {
  const navigate = useNavigate();
  const project = JSON.parse(localStorage.getItem("project-edit"));
  console.log(project);

  const handlecategory = (category) => {
    if (category === "Residential") {
      return "a residential";
    } else if (category === "Commercial") {
      return "a commercial";
    } else if (category === "Residential and Commercial") {
      return "both residential and commercial";
    }
  };

  return (
    <div className="projectitem-container">
      <div className="projectitem-details">
        <div>
          <input
            type="button"
            className="projectitem-button"
            value="Go back"
            onClick={() => navigate("/projects")}
          />
          {localStorage.getItem("token") && (
            <input
              type="button"
              className="projectitem-button"
              value="Edit"
              onClick={() => navigate("/updateproject")}
            />
          )}
        </div>
        <h1>{project.pname}</h1>
        <ul>
          <li>
            It is {handlecategory(project.category)} project initiated in{" "}
            {project.year} and it is {project.inprogress}. It is situated in{" "}
            {project.location}.
          </li>
          {/* <li>Category </li> */}
          <li>{project.description} </li>
          {/* <li>Inprogress </li> */}
          {/* <li>Location </li> */}
          {/* <li>Show </li> */}
          {/* <li>Year</li> */}
        </ul>
      </div>

      {Array.isArray(project.images) ? (
        project.images.map((image, index) => {
          return (
            <picture
              className={
                (index === 0 && "first-picture") + " projectitem-picture"
              }
              key={`picture-${image}`}
            >
              <source
                type="image/avif"
                srcSet={`${image}?width=100 100vw,
                ${image}?width=200 200vw,
                ${image}?width=400 400vw,
                ${image}?width=800 800vw,`}
              />
              <source
                type="image/webp"
                srcSet={`${image}?width=100 100vw,
                ${image}?width=200 200vw,
                ${image}?width=400 400vw,
                ${image}?width=800 800vw,`}
              />
              <img
                className="projectitem-image"
                src={`/static/uploads/projects/${image}`}
                alt={image}
                key={index}
                loading="lazy"
                role="presentation"
                srcSet={`${image}?width=100 100vw,
                ${image}?width=200 200vw,
                ${image}?width=400 400vw,
                ${image}?width=800 800vw,`}
                sizes="(max-width:800px) 100vw, 50vw"
                // decoding="async"
                fetchpriority="high"
                onClick={() => props.showCarousel(project.images, index)}
              />
            </picture>
          );
        })
      ) : (
        <img
          className="projectitem-image"
          src={`/static/uploads/projects/${project.images}`}
          alt=""
          onClick={() => props.showCarousel(project.images, 0)}
        />
      )}
      {/* {project.images.map((image, index) => {
        <img src={`'${image}'`} alt="Project-image" />;
      })} */}
    </div>
  );
};

export default Projectitem;
