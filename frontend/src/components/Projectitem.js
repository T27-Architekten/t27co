import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./scss and css/Projectitem.scss";

const Projectitem = (props) => {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  // console.log(project);
  const imageRef = useRef(null);

  const handlecategory = (category) => {
    if (category === "Residential") {
      return "a residential";
    } else if (category === "Commercial") {
      return "a commercial";
    } else if (category === "Residential and Commercial") {
      return "both residential and commercial";
    }
  };

  // ---------------------------------------------------------------- function for loading pictures.const loadText = document.querySelector('.loading-text');

  useEffect(() => {
    setProject(JSON.parse(localStorage.getItem("project-edit")));
    // const bg = document.getElementById("projectitem-image");
    // console.log(imageRef.current);
    // let load = 0;
    // let int = setInterval(blurring, 10);
    // function blurring() {
    //   load++;
    //   if (load > 99) {
    //     clearInterval(int);
    //   }
    //   bg.style.filter = `blur(${scale(load, 0, 100, 10, 0)}px)`;
    // }
    // function scale(number, inMin, inMax, outMin, outMax) {
    //   return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    // }
  }, []);

  return (
    project && (
      <div className="projectitem-container">
        <div className="projectitem-details-background">
          <div className="projectitem-details ">
            <span>
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
            </span>

            <h1>{project.pname}</h1>
            <hr />
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
        </div>
        <div className="projectitem-images-background">
          {Array.isArray(project.images) ? (
            project.images.map((image, index) => {
              return (
                <picture
                  className={
                    (index === 0 && "first-picture") + " projectitem-picture "
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
                    className="projectitem-image "
                    id="projectitem-image"
                    src={`/static/uploads/projects/${image}`}
                    alt={image}
                    key={index}
                    ref={imageRef}
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
                  {/* <span
                className="projectitem-loading"
                id="projectitem-loading"
                style={{ color: "white" }}
              >
                0%
              </span> */}
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
        </div>
      </div>
    )
  );
};

export default Projectitem;
