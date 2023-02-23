import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Signup = (props) => {
  const context = useContext(AuthContext);
  const { createUser } = context;
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(user);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="container col-md-4 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="d-flex justify-content-evenly">Add new user</h2>
      <form className="form-floating container my-3">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            name="name"
            onChange={onChange}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            name="email"
            onChange={onChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            // https://stackoverflow.com/questions/54970352/input-elements-should-have-autocomplete-attributes
            autoComplete="off"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            placeholder="Confirm Password"
            onChange={onChange}
            // https://stackoverflow.com/questions/54970352/input-elements-should-have-autocomplete-attributes
            autoComplete="off"
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <div className="form-floating mb-3">
          <select
            className="form-select"
            aria-label="Default select"
            placeholder="Role"
            id="role"
            name="role"
            onChange={onChange}
          >
            <option value=""></option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <label htmlFor="category" className="form-label">
            Category
          </label>
        </div>
        <div className="d-flex justify-content-evenly">
          <button onClick={handleSubmit} className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
