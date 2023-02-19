import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import Projects from "./components/Projects";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import ContactUs from "./components/ContactUs";
import ProjectState from "./context/projects/ProjectState";
import Addproject from "./components/Admin/Addproject";
import Alert from "./components/Alert";
import Updateproject from "./components/Admin/Updateproject";
import LoadingBar from "react-top-loading-bar";

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
      <ProjectState>
        <Router>
          <Navbar />
          <LoadingBar height={2.5} color="#ffc107" progress={progress} />
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
          </Routes>
        </Router>
      </ProjectState>
    </div>
  );
}

export default App;
