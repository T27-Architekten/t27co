import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./scss and css/Navbar.scss";

export const Navbar = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  // Hide navbar on homepage.
  const viewNav = () => {
    if (location.pathname === "/") {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/updateproject") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    } // eslint-disable-next-line
  }, [window.location.pathname]);

  // const onClick = () => {
  //   localStorage.clear();
  //   navigate("/login");
  //   props.showAlert("Logout successfully", "success");
  // };
  const handleClick = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    setClick(!click);
  };
  const handleToggle = () => {
    setClick(!click);
  };

  // console.log(location.pathname);
  return (
    // <div className={window.location.pathname === "/" ? "invisible" : "visible"}>
    viewNav() && (
      // <div className="sticky-top">
      // <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <nav className="navbar ">
        {/* <Link className="navbar-brand" to="/">
          T27
        </Link> */}
        <div className="logo">
          <Link className="brand-title" to="/">
            <img className="logo_img" src={"/static/logo.png"} alt="T27"></img>
            <span className="logo-name">T27 Architekten</span>&nbsp;
            {/* <span className="green"> Sharma</span> */}
          </Link>
        </div>
        <i
          className="fa-solid fa-bars fa-xl toggle-bars"
          onClick={handleClick}
        ></i>
        <div className={`navbar-links ${click && "active"}`}>
          <ul>
            <li className="nav-link">
              {/* <a href="/">Home</a> */}
              <Link
                className={location.pathname === "/" ? "active" : undefined}
                to="/"
                onClick={handleToggle}
              >
                Home
              </Link>
            </li>
            <li className="nav-link">
              {/* <a href="/images">Images</a> */}
              <Link
                className={
                  location.pathname === "/projects" ? "active" : undefined
                }
                to="/projects"
                onClick={handleToggle}
              >
                Projects
              </Link>
            </li>
            <li className="nav-link">
              {/* <a href="/posts">Posts</a> */}
              <Link
                className={
                  location.pathname === "/contactus" ? "active" : undefined
                }
                to="/contactus"
                onClick={handleToggle}
              >
                Contact Us
              </Link>
            </li>
            {/* <li className="nav-link">

              <Link
                className={
                  location.pathname === "/timeline" ? "active" : undefined
                }
                to="/timeline"
                onClick={handleToggle}
              >
                Timeline
              </Link>
            </li> */}
            <li className="nav-link">
              <i
                className="fa-solid fa-circle-user fa-2xl login-icon"
                role="button"
                onClick={() => {
                  localStorage.getItem("token")
                    ? navigate("/user")
                    : navigate("/login");
                  handleToggle();
                }}
              ></i>
            </li>
            {localStorage.getItem("token") && (
              <li className="nav-link">
                <i
                  className="fa-solid fa-right-from-bracket fa-2xl login-icon"
                  role="button"
                  onClick={() => {
                    props.setProgress(0);
                    localStorage.removeItem("token");
                    props.setProgress(50);
                    navigate("/login");
                    props.setProgress(100);
                    handleToggle();
                  }}
                ></i>
              </li>
            )}
          </ul>
        </div>
      </nav>
      // </div>
    )
  );
};
