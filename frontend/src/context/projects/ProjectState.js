import { useState } from "react";
import ProjectContext from "./projectContext";

const ProjectState = (props) => {
  const host_env = process.env.REACT_APP_HOST;
  const { showAlert } = props;
  const [projects, setProjects] = useState([]);

  // ------------------------------------------------------------------- Get all projects.
  const getProjects = async () => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(`${host_env}/api/projects/fetchallprojects`, {
      method: "GET",
    });
    props.setProgress(30);
    let json = await response.json();
    props.setProgress(50);
    if (json) {
      // Remove values which are restricted.
      if (!localStorage.getItem("token")) {
        json = json.filter((prjct) => {
          return prjct.show === true;
        });
      }
      // Sort projects according to the year.
      json.sort((a, b) => b.year - a.year);
      props.setProgress(70);
      setProjects(json);
      props.setProgress(100);
      // console.log(allprj);
      return json;
    } else {
      console.log("Internal server error.");
      props.setProgress(100);
    }
  };

  // ------------------------------------------------------------------- Add new project. Authentication is required.
  const addProject = async (formData) => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(`${host_env}/api/projects/addproject`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });
    props.setProgress(50);
    // Get values in JSON format.
    const json = await response.json();
    console.log(json);
    // If the there is an error, return a message.
    if (json.Error) {
      showAlert("Internal server error.", "danger");
      console.log("Internal server error.");
      props.setProgress(100);
    } else {
      props.setProgress(70);
      // Concatinating the new to the existing project variable.
      setProjects(projects.concat(json.Project));
      showAlert(
        '"' + formData.get("pname") + '" project is successfully added.',
        "success"
      );
      props.setProgress(100);
    }
  };

  // ------------------------------------------------------------------- Delete an existing project. Authentication required.
  const deleteProject = async (id, images) => {
    props.setProgress(10);
    // Api Call
    const response = await fetch(`${host_env}/api/projects/deleteproject`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id, images: images }),
    });

    props.setProgress(30);
    const json = await response.json();
    if (json.success) {
      console.log(json, "The project is successfully deleted.");
      props.setProgress(50);
      const newProject = projects.filter((project) => {
        return project._id !== id;
      });
      props.setProgress(70);
      setProjects(newProject);
      props.showAlert("The project is successfully deleted.");
    } else {
      console.log("The was an issue in deleting the project.");
    }
    props.setProgress(100);
  };

  // ------------------------------------------------------------------- Edit an existing project. Authentication required.
  const editProject = async (project) => {
    // for (const value of formData.values()) {
    //   console.log(value, 100);
    // }

    // console.log(project, 103);
    props.setProgress(10);

    // Api Call
    const response = await fetch(`${host_env}/api/projects/updateproject`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify(project),
    });
    // console.log(JSON.stringify(project));
    props.setProgress(30);
    const json = await response.json();
    if (json.success) {
      // console.log(json, "Project Updated.");
      props.setProgress(50);
      let newProject = json.project;
      projects.filter((project) => project._id !== newProject._id);
      // console.log(newProject);
      props.setProgress(70);
      // let newProjects = JSON.parse(JSON.stringify(projects));
      // setProjects(newProjects);
      projects.push(newProject);
      props.setProgress(100);
      return true;
    } else {
      props.setProgress(100);
      console.log("Project udpation failed.");
      return false;
    }
  };

  // ------------------------------------------------------------------- Check project whether it exists or not.
  const checkproject = async (pname) => {
    props.setProgress(10);
    // API call
    const response = await fetch(`${host_env}/api/projects/fetchproject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ pname }),
    });
    try {
      props.setProgress(60);
      // Get data if there is.
      const json = await response.json();
      // props.setProgress(80);
      props.setProgress(100);
      return json;
    } catch (error) {
      props.setProgress(100);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        getProjects,
        // deleteImage,
        editProject,
        deleteProject,
        checkproject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
