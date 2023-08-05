import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import "./../scss and css/lib.scss";
import variables from "./../scss and css/lib.scss";
import "./../scss and css/Modal.scss";

const Signup = (props) => {
  const context = useContext(AuthContext);
  const { createUser } = context;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const navigate = useNavigate();
  const [addUserModal, setAddUserModal] = useState(false);

  const buttonStyles = {
    gap: "10px",
    width: "9rem",
    fontWeight: "900",
    padding: " 10px",
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handleSubmit");
    // Validate email
    const emailRegex =
      /^[a-zA-Z0-9\.\_\%\+\- ]+@(?:[a-zA-Z0-9\.\-\_\!]+\.)+[A-Za-z]{2,4}$/; // eslint-disable-line
    const passwordRegex = /^(?=.*[.@-])(?=.*\d)(?=[^A-Z]*[A-Z])\S{8,}$/;

    // Conditional validations.
    if (
      user.name === "" ||
      user.password === "" ||
      user.cpassword === "" ||
      user.email === "" ||
      user.role === ""
    ) {
      props.showAlert("Fill all the required fields.");
    } else if (!emailRegex.test(user.email)) {
      props.showAlert(
        "Please enter a valid email address. (Example: example@mail.com)"
      );
    } else if (!passwordRegex.test(user.password)) {
      // Validate password
      props.showAlert(
        "A valid password should ensure the following parameters,\n" +
          "1. Must contain atleast one lowercase character.\n" +
          "2. Must contain atleast one uppercase character.\n" +
          "3. Must contain atleast one ., - or @ character.\n" +
          "4. The password must have a minimum of 8 characters.",
        undefined,
        10000
      );
    } else if (user.password !== user.cpassword) {
      props.showAlert("Password and confirm password do not match.");
    } else {
      setAddUserModal(true);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* ------------------------------------------------ Modal ---------- Verify using password to add new user */}
      {addUserModal && (
        <div id="open-modal" className="modal-window">
          <div>
            <h1>
              <i className="fa-solid fa-trash" style={{ color: " #2c3337" }} />
              &nbsp;
              {"Authenticate to add user"}
            </h1>
            <hr />
            {/* -------------- content */}
            <p>Enter the password to add user.</p>
            <input
              className="t27-input-text"
              type="password"
              style={{
                width: "20rem",
                backgroundColor: "#23292c",
                color: variables.tanColor,
                marginTop: "2px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: variables.tanColor,
                marginBottom: "1.5rem",
              }}
            />
            {/* <div className="signup-modal"></div> */}
            <div className="action-modal-bttns">
              <button
                className="action-button"
                onClick={() => {
                  createUser(user);
                  setAddUserModal(false);
                }}
              >
                Add user
              </button>
              <button
                className="action-button"
                onClick={() => setAddUserModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------------------- Sign up */}
      <div className="t27-container-div-2">
        <div
          className="t27-container-div-left"
          style={{
            overflow: "hidden",
            display: "grid",
            alignContent: "space-evenly",
            justifyItems: "center",
          }}
        >
          <img
            className="left-image"
            key="add-user"
            src="/static/Add-user.png"
            // src={`${backUrl}/static/Add-user.png`}
            alt=""
            style={{
              width: "70%",
              // height: "100%",
              // position: "relative",
              // display: "inline-block",
              // backgroundSize: "cover",
              // zIndex: "100",
            }}
          />
        </div>
        <div className="t27-container-div-right">
          <div className="right-div-input">
            <h3>
              <b>New User</b>
            </h3>
            <ul>
              <li>
                <label>Name</label>
                <input type="text" name="name" onChange={onChange} />
              </li>
              {/* <li>
                <label>Email</label>
                <textarea name="description" onChange={onChange} />
              </li> */}
              <li>
                <label> Email </label>
                <input type="text" name="email" onChange={onChange} />
              </li>
              <li>
                <label>New Password </label>
                <input type="password" name="password" onChange={onChange} />
              </li>
              <li>
                <label> Confirm Password </label>
                <input type="password" name="cpassword" onChange={onChange} />
              </li>
              <li>
                <label htmlFor="role">Role</label>
                <select
                  placeholder="Role"
                  id="role"
                  name="role"
                  onChange={onChange}
                >
                  <option value=""></option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </li>
            </ul>
            <div className="right-div-buttons">
              {/* -------------------------------- Add Button */}
              <button
                // disabled={user.name.length < 3 || user.password.length < 3}
                className="right-div-button"
                style={buttonStyles}
                // onClick={}
                onClick={handleSubmit}
              >
                Add User
              </button>

              {/* ------------------------------------------- Cancel. */}
              <button
                style={buttonStyles}
                className="right-div-button"
                onClick={() => navigate("/user")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
    // <div className="container col-md-4 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
    //   <h2 className="d-flex justify-content-evenly">Add new user</h2>
    //   <form className="form-floating container my-3">
    //     <div className="form-floating mb-3">
    //       <input
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         placeholder="Name"
    //         name="name"
    //         onChange={onChange}
    //       />
    //       <label htmlFor="floatingInput">Name</label>
    //     </div>
    //     <div className="form-floating mb-3">
    //       <input
    //         type="email"
    //         className="form-control"
    //         id="email"
    //         placeholder="name@example.com"
    //         name="email"
    //         onChange={onChange}
    //       />
    //       <label htmlFor="floatingInput">Email address</label>
    //     </div>
    //     <div className="form-floating mb-3">
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="password"
    //         name="password"
    //         placeholder="Password"
    //         onChange={onChange}
    //         // https://stackoverflow.com/questions/54970352/input-elements-should-have-autocomplete-attributes
    //         autoComplete="off"
    //       />
    //       <label htmlFor="floatingPassword">Password</label>
    //     </div>
    //     <div className="form-floating mb-3">
    //       <input
    //         type="password"
    //         className="form-control"
    //         id="cpassword"
    //         name="cpassword"
    //         placeholder="Confirm Password"
    //         onChange={onChange}
    //         // https://stackoverflow.com/questions/54970352/input-elements-should-have-autocomplete-attributes
    //         autoComplete="off"
    //       />
    //       <label htmlFor="floatingPassword">Confirm Password</label>
    //     </div>
    //     <div className="form-floating mb-3">
    //       <select
    //         className="form-select"
    //         aria-label="Default select"
    //         placeholder="Role"
    //         id="role"
    //         name="role"
    //         onChange={onChange}
    //       >
    //         <option value=""></option>
    //         <option value="Manager">Manager</option>
    //         <option value="Admin">Admin</option>
    //       </select>
    //       <label htmlFor="role" className="form-label">
    //         Role
    //       </label>
    //     </div>
    //     <div className="d-flex justify-content-evenly">
    //       <button onClick={handleSubmit} className="btn btn-primary">
    //         Add
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default Signup;
