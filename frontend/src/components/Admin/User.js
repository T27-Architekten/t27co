import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import "./scss and css/User.scss";

const User = (props) => {
  const context = useContext(AuthContext);
  const { getUser } = context;
  const [editD, setEditD] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    async function getUserDetails() {
      const userDetails = await getUser();
      if (userDetails) {
        setUser({
          name: userDetails.user.name,
          email: userDetails.user.email,
          role: userDetails.user.role,
        });
      }
    }
    getUserDetails();
  }, []);

  const handleUpdate = () => {};

  //   const navUrl = "/projects";
  const navigate = useNavigate();

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       let logObj = await login(user.email, user.password);
  //       if (logObj) {
  //         props.showAlert("Login successfully", "success");
  //         navigate(navUrl);
  //       } else {
  //         props.showAlert("Invalid credentials.", "danger");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="user-container">
      <div
        className="user-label-h"
        style={{ backgroundImage: "url('/static/User-space.jpg')" }}
      >
        <h1>User Space</h1>
      </div>
      <div className="user-options-flex">
        <div
          className="user-options"
          style={{ backgroundImage: "url('/static/Add-user.jpg')" }}
        >
          <h1 className="h1-add-user">Add User</h1>
        </div>
        <div
          className="user-options"
          style={{ backgroundImage: "url('/static/Add-project.jpg')" }}
        >
          <h1 className="h1-add-project">Add Project</h1>
        </div>
      </div>
    </div>

    // <>
    //   <div className="container col-md-4 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
    //     <h2 className="d-flex justify-content-evenly">Login</h2>
    //     <div className="form-floating container my-3">
    //       <div className="form-floating mb-3">
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="name"
    //           placeholder="Name"
    //           name="name"
    //           onChange={onChange}
    //           value={user.name}
    //           disabled={editD}
    //         />
    //         <label htmlFor="floatingInput">Name</label>
    //       </div>
    //       <div className="form-floating mb-3">
    //         <input
    //           type="email"
    //           className="form-control"
    //           id="email"
    //           placeholder="name@example.com"
    //           name="email"
    //           onChange={onChange}
    //           disabled={true}
    //           value={user.email}
    //         />
    //         <label htmlFor="floatingInput">Email address</label>
    //       </div>

    //       {/* <div className="form-floating mb-3">
    //         <select
    //           className="form-select"
    //           aria-label="Default select"
    //           placeholder="Role"
    //           id="role"
    //           name="role"
    //           onChange={onChange}
    //           disabled={editD}
    //           value={user.role}
    //         >
    //           <option value=""></option>
    //           <option value="Manager">Manager</option>
    //           <option value="Admin">Admin</option>
    //         </select>
    //         <label htmlFor="category" className="form-label">
    //           Role
    //         </label>
    //       </div> */}
    //       <div className="d-flex justify-content-evenly">
    //         {!editD && (
    //           <button className="btn btn-primary" onClick={() => handleUpdate}>
    //             Update
    //           </button>
    //         )}
    //         <button
    //           className="btn btn-primary"
    //           onClick={() => (editD ? setEditD(false) : setEditD(true))}
    //         >
    //           {editD ? "Edit" : "cancel"}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="container col-md-4 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded d-flex justify-content-evenly">
    //     <button
    //       type="button"
    //       className="btn btn-warning"
    //       onClick={() => navigate("/addproject")}
    //     >
    //       Add new project
    //     </button>

    //     <button
    //       type="button"
    //       className="btn btn-success"
    //       onClick={() => navigate("/signup")}
    //     >
    //       Add new user
    //     </button>
    //   </div>
    // </>
  );
};

export default User;
