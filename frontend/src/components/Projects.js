import React, { useContext, useEffect, useState } from "react";
import projectContext from "../context/projects/projectContext";
// import noImage from "../assets/front/No image.jpg";
// import background from "../images/list1.jpg";
// import Projectitem from "../components/Projectitem";
import "./scss and css/Projects.scss";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Projects = (props) => {
  const context = useContext(projectContext);
  const { projects, getProjects } = context;
  const navigate = useNavigate();

  // const { showAlert } = props;
  // const [allprojects, setAllprojects] = useState(null);
  const [projectNumber, setProjectNumber] = useState(0);
  // let showProject = [];

  useEffect(() => {
    const getpjts = async () => await getProjects();
    getpjts();
    // localStorage.getItem("token")
    //   ? setAllprojects(projects)
    //   : projects?.forEach((project) => {
    //       project.show && setAllprojects([...allprojects, project]);
    //     });
    // console.log(allprojects);

    // eslint-disable-next-line
  }, []);

  const handleImages = (images) => {
    if (Array.isArray(images)) {
      return `/static/uploads/projects/${images[0]}`;
    } else {
      if (images) {
        return `/static/uploads/projects/${images}`;
      } else {
        return `/static/No-image.jpg`;
        // return `/static/uploads/projects/${images[0]}`;
      }
    }
  };

  const goToPrevious = () => {
    projectNumber > 0
      ? setProjectNumber(projectNumber - 1)
      : setProjectNumber(projects.length - 1);
  };
  const goToNext = () => {
    !(projects.length - 1 === projectNumber)
      ? setProjectNumber(projectNumber + 1)
      : setProjectNumber(0);
  };

  // console.log(projects);

  return projects.length < 1 ? (
    // Loader for loading the page.
    <Spinner />
  ) : (
    <div className="projects-container">
      <picture
        className="projects-picture"
        key={`picture-${projects[projectNumber]?.images}`}
      >
        <source
          type="image/avif"
          srcSet={`${projects[projectNumber]?.images}?width=100 100vw,
                ${projects[projectNumber]?.images}?width=200 200vw,
                ${projects[projectNumber]?.images}?width=400 400vw,
                ${projects[projectNumber]?.images}?width=800 800vw,`}
        />
        <source
          type="image/webp"
          srcSet={`${projects[projectNumber]?.images}?width=100 100vw,
                ${projects[projectNumber]?.images}?width=200 200vw,
                ${projects[projectNumber]?.images}?width=400 400vw,
                ${projects[projectNumber]?.images}?width=800 800vw,`}
        />
        <img
          className="projects-image"
          key={projects[projectNumber]?.images}
          src={handleImages(projects[projectNumber]?.images)}
          alt={projects[projectNumber]?.images}
          loading="lazy"
          role="presentation"
          srcSet={`${projects[projectNumber]?.images}?width=100 100vw,
                ${projects[projectNumber]?.images}?width=200 200vw,
                ${projects[projectNumber]?.images}?width=400 400vw,
                ${projects[projectNumber]?.images}?width=800 800vw,`}
          sizes="(max-width:800px) 100vw, 50vw"
          // decoding="async"
          fetchpriority="high"
        />
      </picture>
      {/* <div></div> */}
      <div className="projects-info">
        <h1>Projects</h1>

        <div className="project-prevNext-details">
          <div className="projects-prevNext">
            <div onClick={goToPrevious} className="leftArrowStyles arrow-click">
              ❰
            </div>
            &nbsp;{` ${projectNumber + 1} / ${projects.length} `}&nbsp;
            <div onClick={goToNext} className="rightArrowStyles arrow-click">
              ❱
            </div>
            <hr style={{ border: "1px solid" }} />
          </div>

          {/* ------------------------ PROJECT DETAILS */}
          <div className="project-details">
            <ul>
              <li className="project-pname">
                {projects[projectNumber].pname}{" "}
                <hr style={{ width: "100px" }} />
              </li>
              <li>
                {projects[projectNumber].year}
                &nbsp;&nbsp;&nbsp;
                <i className="fa-regular fa-calendar project-details-icon"></i>
              </li>
              <li>
                {projects[projectNumber].location}
                &nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-location-dot project-details-icon"></i>
              </li>
              <li>
                {projects[projectNumber].category}
                &nbsp;&nbsp;&nbsp;
                <i className="fa-solid fa-building project-details-icon"></i>
              </li>
              {localStorage.getItem("token") && (
                <li>
                  {projects[projectNumber].show
                    ? "Visible to all"
                    : "Hidden to customers"}
                  &nbsp;&nbsp;&nbsp;
                  <i className="fa-solid fa-eye project-details-icon"></i>
                </li>
              )}
              <li>
                <input
                  className="view-more-button"
                  type="button"
                  value="View more"
                  onClick={() => {
                    localStorage.setItem(
                      "project-edit",
                      JSON.stringify(projects[projectNumber])
                    );
                    console.log(projects[projectNumber].pname);
                    navigate("/projectitem");
                  }}
                />
              </li>
            </ul>
            {/* <div></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
