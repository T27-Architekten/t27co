import React, { useContext, useEffect, useState } from "react";
import projectContext from "../context/projects/projectContext";
// import noImage from "../assets/front/No image.jpg";
// import background from "../images/list1.jpg";
// import Projectitem from "../components/Projectitem";
import "./scss and css/Projects.scss";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

import ProjectItem from "./Projectitem";

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
      <div
        className="projects-image"
        style={{
          backgroundImage: `url('${handleImages(
            projects[projectNumber]?.images
          )}')`,
        }}
      ></div>
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
                {projects[projectNumber].pname} <hr style={{ width: "80px" }} />
              </li>
              <li>
                {projects[projectNumber].year}
                &nbsp;&nbsp;&nbsp;
                <i
                  className="fa-regular fa-calendar project-details-icon"
                  style={{ color: " #ffffff" }}
                ></i>
              </li>
              <li>
                {projects[projectNumber].location}
                &nbsp;&nbsp;&nbsp;
                <i
                  className="fa-solid fa-location-dot project-details-icon"
                  style={{ color: " #ffffff" }}
                ></i>
              </li>
              <li>
                {projects[projectNumber].category}
                &nbsp;&nbsp;&nbsp;
                <i
                  className="fa-solid fa-building project-details-icon"
                  style={{ color: " #ffffff" }}
                ></i>
              </li>
              {localStorage.getItem("token") && (
                <li>
                  {projects[projectNumber].show
                    ? "Visible to all"
                    : "Hidden to customers"}
                  &nbsp;&nbsp;&nbsp;
                  <i
                    className="fa-solid fa-eye project-details-icon"
                    style={{ color: " #ffffff" }}
                  ></i>
                </li>
              )}
              <li>
                <input
                  className="view-more-button"
                  type="button"
                  value="View more"
                  onClick={() =>
                    navigate("/projectitem", {
                      state: { projectNumber },
                    })
                  }
                />
              </li>
            </ul>
            {/* <div></div> */}
          </div>
        </div>
      </div>

      {/* <div className="all-projects">
        {projects.map((project, index) => {
          return (
            <div className="card" key={index}>
              <img src={handleImages(project.images)} alt="" />
              <div className="card-content">
                <h3>{project.pname}</h3>
                <p>{project.description}</p>
                <a href="#" className="button">
                  Find out more &nbsp;
                  <i
                    className="fa-solid fa-arrow-right"
                    style={{ color: " #000000" }}
                  ></i>
                </a>
              </div>
            </div>
          );
        })}
      </div> */}

      {/* <div className="card">
        <img
          src="https://images.unsplash.com/photo-1656618020911-1c7a937175fd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc1MzQyNTE&ixlib=rb-1.2.1&q=80"
          alt=""
        />
        <div className="card-content">
          <h3>Card Heading</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            exercitationem iste, voluptatum, quia explicabo laboriosam rem
            adipisci voluptates cumque, veritatis atque nostrum corrupti ipsa
            asperiores harum? Dicta odio aut hic.
          </p>
          <a href="#" className="button">
            Find out more &nbsp;
            <i
              className="fa-solid fa-arrow-right"
              style={{ color: " #ffffff" }}
            ></i>
          </a>
        </div>
      </div> */}

      {/* <section id="timeline">
          {projects.map((project, index) => {
            return (
              (localStorage.getItem("token") || project.show) && (
                <div className="tl-item" key={index}>
                  <div
                    className="tl-bg"
                    // style={{
                    //   backgroundImage: "url('../asset/images/Images-page/pic2.jpg')",
                    // }}
                  >
                    <img
                      className="image-timeline"
                      // src={require("../asset/images/Images-page/pic2.jpg")}
                      src={handleImages(project.images)}
                      alt="img"
                    />
                  </div>

                  <div className="tl-year">
                    <p className="f2 heading--sanSerif">{project.year}</p>
                  </div>

                  <div className="tl-content">
                    <h1>{project.pname}</h1>
                    <p>{project.description}</p>
                  </div>
                </div>
              )
            );
          })}

        
        </section> */}
    </div>
  );
};

export default Projects;
