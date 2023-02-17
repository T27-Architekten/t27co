import { useState } from "react";
import ProjectContext from "./projectContext";

const ProjectState = (props) => {
  const host_env = process.env.REACT_APP_HOST;

  const [projects, setProjects] = useState([]);

  // Get all projects.
  const getProjects = async () => {
    // Api Call
    const response = await fetch(`${host_env}/api/projects/fetchallnotes`, {
      method: "GET",
      headers: {
        // "auth-token": localStorage.getItem("token"),
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNlZGM4OTFlZGYyODFkOWIzMzc0MzRkIiwiaWF0IjoxNjc2NTMzOTk1fQ.YdvFDh0LSBFtY0rAD3XfGQtCazTK50TPIjBu0fnf94c",
      },
    });
    const json = await response.json();
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
    setProjects(projects.concat(json.Note));
  };

  //   // Delete an existing note.
  //   const deleteProject = async (id) => {
  //     // Api Call
  //     const response = await fetch(`${host_env}/api/notes/deletenote/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //     });
  //     const json = await response.json();
  //     console.log(json);
  //     const newNotes = notes.filter((note) => {
  //       return note._id !== id;
  //     });
  //     setNotes(newNotes);
  //   };

  //   // Edit an existing project.
  //   const editProject = async (id, title, description, tag) => {
  //     // Api Call
  //     const response = await fetch(`${host_env}/api/notes/updatenote/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "auth-token": localStorage.getItem("token"),
  //       },
  //       body: JSON.stringify({ title, description, tag }),
  //     });

  //     const json = await response.json();
  //     console.log(json);
  //     let newNotes = JSON.parse(JSON.stringify(notes));
  //     // Logic to edit in client
  //     for (let index = 0; index < notes.length; index++) {
  //       const element = newNotes[index];
  //       if (element._id === id) {
  //         newNotes[index].title = title;
  //         newNotes[index].description = description;
  //         newNotes[index].tag = tag;
  //         break;
  //       }
  //     }
  //     setNotes(newNotes);
  //   };

  return (
    <ProjectContext.Provider
      value={{ projects, addProject, getProjects }}
      // value={{ projects, getProjects, addProject, deleteProject, editProject }}÷
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
