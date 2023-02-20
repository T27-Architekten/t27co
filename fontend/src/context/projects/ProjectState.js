import { useState } from "react";
import ProjectContext from "./projectContext";

const ProjectState = (props) => {
  const host_env = process.env.REACT_APP_HOST;

  const [projects, setProjects] = useState([]);

  // Get all projects.
  const getProjects = async () => {
    // Api Call
    const response = await fetch(`${host_env}/api/projects/fetchallprojects`, {
      method: "GET",
      headers: {
        // "auth-token": localStorage.getItem("token"),
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZGM4OTFlZGYyODFkOWIzMzc0MzRkIiwiaWF0IjoxNjc2NTMzOTk1fQ.YdvFDh0LSBFtY0rAD3XfGQtCazTK50TPIjBu0fnf94c",
      },
    });
    const json = await response.json();
    // Sort projects according to the year.
    json.sort((a, b) => b.year - a.year);
    setProjects(json);
  };

  // Add new note.
  const addProject = async (
    pname,
    description,
    location,
    year,
    category,
    inprogress
  ) => {
    // Api Call

    const response = await fetch(`${host_env}/api/projects/addproject`, {
      method: "POST",
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
    });

    const json = await response.json();
    setProjects(projects.concat(json.Project));
  };

  //   // Delete an existing project.
  const deleteProject = async (id) => {
    // Api Call
    const response = await fetch(
      `${host_env}/api/projects/deleteproject/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem("token"),
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZGM4OTFlZGYyODFkOWIzMzc0MzRkIiwiaWF0IjoxNjc2NTMzOTk1fQ.YdvFDh0LSBFtY0rAD3XfGQtCazTK50TPIjBu0fnf94c",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newProject = projects.filter((project) => {
      return project._id !== id;
    });
    setProjects(newProject);
  };

  //   // Edit an existing project.
  const editProject = async (
    id,
    pname,
    description,
    location,
    year,
    category,
    inprogress
  ) => {
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

    const json = await response.json();
    console.log(json);
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
    setProjects(newProjects);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, getProjects, editProject, deleteProject }}
      // value={{ projects, getProjects, addProject, deleteProject, editProject }}÷
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
