import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
// ------------------------------------------------ Components
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
import PrivateRoutes from "./utils/PrivateRoutes";
import NotFound from "./components/NotFound";
import Modal from "./components/Modal";
import Carousel from "./components/Carousel";

// ------------------------------------------------ Contexts
import ProjectState from "./context/projects/ProjectState";
import AuthState from "./context/auth/AuthState";
import Projectitem from "./components/Projectitem";

function App() {
  const [alert, setAlert] = useState(null);
  const [progress, setProgress] = useState(0);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [modal, setModal] = useState(null);
  const [carousel, setCarousel] = useState(null);

  const showAlert = (message, type, ms) => {
    if (!ms) {
      ms = 5000;
    }
    setAlert({
      msg: message,
      // types can be primary, secondary, success, warning, info, light, dark and danger.
      // https://getbootstrap.com/docs/5.2/components/alerts/
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, ms);
  };

  // ------------------------------------------------ showModal
  const showModal = (heading, content, handleFunction, button) => {
    setModal({
      heading: heading,
      content: content,
      handleFunction: handleFunction,
      button: button,
    });
  };

  const showCarousel = (images, imageKey) => {
    setCarousel({ images, imageKey });
  };

  return (
    <div className="App">
      <ProjectState setProgress={setProgress} showAlert={showAlert}>
        <AuthState setProgress={setProgress} showAlert={showAlert}>
          <Router>
            <LoadingBar height={2.5} color="#d1b08f" progress={progress} />
            <Navbar showAlert={showAlert} setProgress={setProgress} />
            <Alert alert={alert} />
            <Modal modal={modal} setModal={setModal} />
            <Carousel carousel={carousel} showCarousel={showCarousel} />
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
                path="/projectitem"
                element={
                  <Projectitem
                    showAlert={showAlert}
                    setProgress={setProgress}
                    showCarousel={showCarousel}
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
              {/* ------------------ Private Routes (Check token) ------------------ */}
              <Route element={<PrivateRoutes />}>
                <Route
                  exact
                  path="/addproject"
                  element={
                    <Addproject
                      showAlert={showAlert}
                      setProgress={setProgress}
                    />
                  }
                />

                <Route
                  exact
                  path="/updateproject"
                  element={
                    <Updateproject
                      showAlert={showAlert}
                      setProgress={setProgress}
                      showModal={showModal}
                      showCarousel={showCarousel}
                    />
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
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthState>
      </ProjectState>
    </div>
  );
}

export default App;
