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
    console.log(json, "The project is updated.");
    props.setProgress(50);
    const newProject = projects.filter((project) => {
      return project._id !== id;
    });
    props.setProgress(70);
    setProjects(newProject);
    props.setProgress(100);
  };

  // ------------------------------------------------------------------- Edit an existing project. Authentication required.
  const editProject = async (formData) => {
    for (const value of formData.values()) {
      console.log(value, 100);
    }

    console.log(formData.get("_id"), 103);
    props.setProgress(10);

    // Api Call
    const response = await fetch(`${host_env}/api/projects/updateproject`, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
      body: formData,
    });

    props.setProgress(30);
    const json = await response.json();
    if (json.success) {
      console.log(json, "Project Updated.");
      props.setProgress(50);
      let newProjects = JSON.parse(JSON.stringify(projects));
      // Logic to edit in client
      // for (let index = 0; index < projects.length; index++) {
      //   const element = newProjects[index];
      //   if (element._id === id) {
      //     newProjects[index].pname = pname;
      //     newProjects[index].description = description;
      //     newProjects[index].location = location;
      //     newProjects[index].year = year;
      //     newProjects[index].category = category;
      //     newProjects[index].inprogress = inprogress;
      //     break;
      //   }
      // }
      props.setProgress(70);
      setProjects(newProjects);
      props.setProgress(100);
    } else {
      props.setProgress(100);
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

  // const deleteImage = async (projectId, image) => {
  //   console.log(projectId, image);
  //   props.setProgress(10);
  //   const response = await fetch("/api/projects/deleteimage", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("token"),
  //     },
  //     body: JSON.stringify({}),
  //   });
  //   try {
  //     props.setProgress(60);
  //     // Get data if there is.
  //     const json = await response.json();

  //     if (json.success) {
  //       props.setProgress(100);
  //       return json.success;
  //     }
  //   } catch (error) {
  //     props.setProgress(100);
  //     console.log({ Error: error });
  //     return false;
  //   }
  // };

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
