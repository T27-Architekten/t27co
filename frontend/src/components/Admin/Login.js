import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const context = useContext(AuthContext);
  const { login } = context;
  // user useState is created for fetch body.
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navUrl = "/user";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let logObj = await login(user);
      if (logObj) {
        props.showAlert("Login successfully", "success");
        navigate(navUrl);
      } else {
        props.showAlert("Invalid credentials.", "danger");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container col-md-4 mt-5 shadow p-3 mb-5 bg-body-tertiary rounded">
      <h2 className="d-flex justify-content-evenly ">Login</h2>
      <form className="form-floating container my-3">
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
        <div className="d-flex justify-content-evenly">
          <button onClick={handleSubmit} className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
