import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import projectContext from "../context/projects/projectContext";
import "./scss and css/Projectitem.scss";

const Projectitem = (props) => {
  const context = useContext(projectContext);
  const { projects, getProjects } = context;
  const { state } = useLocation();
  const { projectNumber } = state;
  useEffect(() => {
    const getpjts = async () => await getProjects();
    getpjts();
    // eslint-disable-next-line
  }, []);

  // const handleimage = () => {};

  const handlecategory = (category) => {
    if (category === "Residential") {
      return "a residential";
    } else if (category === "Commercial") {
      return "a commercial";
    } else if (category === "Residential and Commercial") {
      return "both residential and commercial";
    }
  };

  console.log(projects[projectNumber]);
  console.log(projectNumber, 7);
  console.log(Array.isArray(projects[projectNumber]?.images));
  return (
    <div className="projectitem-container">
      <div className="projectitem-details">
        <h1>{projects[projectNumber]?.pname}</h1>
        <ul>
          <li>
            It is {handlecategory(projects[projectNumber]?.category)} project
            initiated in {projects[projectNumber]?.year} and it is{" "}
            {projects[projectNumber]?.inprogress}. It is situated in{" "}
            {projects[projectNumber]?.location}.
          </li>
          {/* <li>Category </li> */}
          <li>{projects[projectNumber]?.description} </li>
          {/* <li>Inprogress </li> */}
          {/* <li>Location </li> */}
          {/* <li>Show </li> */}
          {/* <li>Year</li> */}
        </ul>
      </div>

      {Array.isArray(projects[projectNumber]?.images) ? (
        projects[projectNumber]?.images.map((image, index) => {
          return (
            <img
              className="projectitem-image"
              src={`/static/uploads/projects/${image}`}
              alt="Project-image"
              key={index}
            />
          );
        })
      ) : (
        <img
          className="projectitem-image"
          src={`/static/uploads/projects/${projects[projectNumber]?.images}`}
          alt="Project-image"
        />
      )}
      {/* {projects[projectNumber]?.images.map((image, index) => {
        <img src={`'${image}'`} alt="Project-image" />;
      })} */}
    </div>
  );
};

export default Projectitem;
