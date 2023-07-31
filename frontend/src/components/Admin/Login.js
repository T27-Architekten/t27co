import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import "./scss and css/Login.scss";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [uploadImage, setUploadImage] = useState(false);
  const { login } = context;

  // user useState is created for fetch body.
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [viewPassword, setViewPassword] = useState(false);
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
    <>
      {uploadImage && (
        <div className="upload-image">
          <div className="updload-image-container">
            {/* upload image modal. */}
          </div>
        </div>
      )}
      <div className="login-container">
        {/* <div className="grid"> */}
        <div className="login-info">
          <label>
            <h1>Login</h1>
          </label>
          <br />
          <p>Login to access your account. </p>
        </div>
        <div className="login-details">
          <form
            action="https://httpbin.org/post"
            method="POST"
            className=" login-form"
          >
            <div className="form__field">
              <label className="login-label" htmlFor="login-username">
                {/* <svg className="icon">
              <use href="#icon-user"></use>
            </svg> */}
                <i
                  className="fa-solid fa-user"
                  style={{ color: " #606468" }}
                ></i>
                {/* <span className="hidden">Username</span> */}
              </label>
              <input
                autoComplete="username"
                id="login__username"
                type="text"
                name="email"
                className="form__input"
                placeholder="Email"
                onChange={onChange}
                required
              />
            </div>

            <div className="form__field">
              <label className="login-label" htmlFor="login__password">
                {/* <svg className="icon">
              <use href="#icon-lock"></use>
            </svg> */}
                <i
                  className="fa-solid fa-lock"
                  style={{ color: " #606468" }}
                ></i>
                {/* <span className="hidden">Password</span> */}
              </label>
              <input
                id="login__password"
                type={viewPassword ? "text" : "password"}
                name="password"
                className="form__input"
                placeholder="Password"
                onChange={onChange}
                required
              />
              <label
                htmlFor="login__password "
                className="login-pwd-view login-eye"
                onClick={() => setViewPassword(!viewPassword)}
              >
                <i className="fa-solid fa-eye "></i>
              </label>
            </div>

            <div className="form__field button__field">
              <input type="button" onClick={handleSubmit} value="Login" />
              <input
                type="button"
                onClick={() => navigate("/projects")}
                value="All projects"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
