import { useState } from "react";
import AuthContext from "./authContext";

const AuthState = (props) => {
  const host_env = process.env.REACT_APP_HOST;
  const [user, setUser] = useState();

  // Login user
  const login = async ({ email, password }) => {
    props.setProgress(10);
    // Api call
    const response = await fetch(`${host_env}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    props.setProgress(50);
    try {
      const json = await response.json();
      props.setProgress(70);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
      }
      props.setProgress(100);
      return json.success;
    } catch (error) {
      console.error(error.message);
    }
  };

  // Create new user.
  const createUser = async ({ name, email, password, cpassword, role }) => {
    try {
      props.setProgress(10);
      // Api Call
      if (name === "" || email === "" || password === "" || role === "") {
        console.log("if");
        props.showAlert("Enter all the credentials.", "warning");
        props.setProgress(70);
      } else if (!(password === cpassword)) {
        console.log("if else");
        props.showAlert(
          "Password and confirm password do not match.",
          "danger"
        );
        props.setProgress(70);
      } else {
        console.log("else");
        props.setProgress(30);
        const response = await fetch(`${host_env}/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        });
        props.setProgress(50);
        const json = await response.json();
        console.log(json);
        props.setProgress(70);
        if (json.success) {
          // Save the auth token and redirect
          localStorage.setItem("token", json.authtoken);
          props.showAlert(
            "Thanks for signing up with us " + json.user.name + ".",
            "success"
          );
        } else {
          props.showAlert("Invalid credentials", "danger");
        }
        return json.success;
      }
      props.setProgress(100);
    } catch (error) {
      console.log("error :" + error);
    }
  };

  // Get logged in user details.
  const getUser = async () => {
    try {
      const response = await fetch(`${host_env}/api/auth/getuser`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (json.success) {
        return json;
      } else {
        props.showAlert("Internal server error.", "danger");
      }
    } catch (error) {
      console.log("error :" + error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, createUser, getUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
