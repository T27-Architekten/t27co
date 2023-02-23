import { useState } from "react";
import ProjectContext from "./projectContext";

const ProjectState = (props) => {
  const host_env = process.env.REACT_APP_HOST;

  const [projects, setProjects] = useState([]);

  // Get all projects.
  const getProjects = async () => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(`${host_env}/api/projects/fetchallprojects`, {
      method: "GET",
    });
    props.setProgress(30);
    const json = await response.json();
    props.setProgress(50);
    // Sort projects according to the year.
    json.sort((a, b) => b.year - a.year);
    props.setProgress(70);
    setProjects(json);
    props.setProgress(100);
  };

  // Add new note. Authentication is required.
  const addProject = async (
    pname,
    description,
    location,
    year,
    category,
    inprogress
  ) => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(`${host_env}/api/projects/addproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        pname,
        description,
        location,
        year,
        category,
        inprogress,
      }),
    });
    props.setProgress(50);
    const json = await response.json();
    props.setProgress(70);
    setProjects(projects.concat(json.Project));
    props.setProgress(100);
  };

  //   // Delete an existing project. Authentication required.
  const deleteProject = async (id) => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(
      `${host_env}/api/projects/deleteproject/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    props.setProgress(30);
    const json = await response.json();
    console.log(json);
    props.setProgress(50);
    const newProject = projects.filter((project) => {
      return project._id !== id;
    });
    props.setProgress(70);
    setProjects(newProject);
    props.setProgress(100);
  };

  //   // Edit an existing project. Authentication required.
  const editProject = async (
    id,
    pname,
    description,
    location,
    year,
    category,
    inprogress
  ) => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(
      `${host_env}/api/projects/updateproject/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("token"),
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZGM4OTFlZGYyODFkOWIzMzc0MzRkIiwiaWF0IjoxNjc2NTMzOTk1fQ.YdvFDh0LSBFtY0rAD3XfGQtCazTK50TPIjBu0fnf94c",
        },
        body: JSON.stringify({
          pname,
          description,
          location,
          year,
          category,
          inprogress,
        }),
      }
    );
    props.setProgress(30);
    const json = await response.json();
    console.log(json);
    props.setProgress(50);
    let newProjects = JSON.parse(JSON.stringify(projects));
    // Logic to edit in client
    for (let index = 0; index < projects.length; index++) {
      const element = newProjects[index];
      if (element._id === id) {
        newProjects[index].pname = pname;
        newProjects[index].description = description;
        newProjects[index].location = location;
        newProjects[index].year = year;
        newProjects[index].category = category;
        newProjects[index].inprogress = inprogress;
        break;
      }
    }
    props.setProgress(70);
    setProjects(newProjects);
    props.setProgress(100);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, getProjects, editProject, deleteProject }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
