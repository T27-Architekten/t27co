import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
// Pages
import Home from "./components/Home";
import Projects from "./components/Projects";
import { Navbar } from "./components/Navbar";
import ContactUs from "./components/ContactUs";
import Addproject from "./components/Admin/Addproject";
import Alert from "./components/Alert";
import Updateproject from "./components/Admin/Updateproject";
import Login from "./components/Admin/Login";
import Signup from "./components/Admin/Signup";
import User from "./components/Admin/User";

// Contexts
import ProjectState from "./context/projects/ProjectState";
import AuthState from "./context/auth/AuthState";

function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      // types can be primary, secondary, success, warning, info, light, dark and danger.
      // https://getbootstrap.com/docs/5.2/components/alerts/
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <div className="App">
      <ProjectState setProgress={setProgress}>
        <AuthState setProgress={setProgress} showAlert={showAlert}>
          <Router>
            <LoadingBar height={2.5} color="#ffc107" progress={progress} />
            <Navbar showAlert={showAlert} />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/projects"
                element={
                  <Projects showAlert={showAlert} setProgress={setProgress} />
                }
              />
              <Route
                exact
                path="/contactus"
                element={
                  <ContactUs showAlert={showAlert} setProgress={setProgress} />
                }
              />
              <Route
                exact
                path="/addproject"
                element={
                  <Addproject showAlert={showAlert} setProgress={setProgress} />
                }
              />
              <Route
                exact
                path="/updateproject"
                element={
                  <Updateproject
                    showAlert={showAlert}
                    setProgress={setProgress}
                  />
                }
              />
              <Route
                exact
                path="/login"
                element={
                  <Login showAlert={showAlert} setProgress={setProgress} />
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  <Signup showAlert={showAlert} setProgress={setProgress} />
                }
              />
              <Route
                exact
                path="/user"
                element={
                  <User showAlert={showAlert} setProgress={setProgress} />
                }
              />
            </Routes>
          </Router>
        </AuthState>
      </ProjectState>
    </div>
  );
}

export default App;
