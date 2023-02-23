import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const onClick = () => {
    localStorage.clear();
    navigate("/login");
    props.showAlert("Logout successfully", "success");
  };
  return (
    // <div className={window.location.pathname === "/" ? "invisible" : "visible"}>
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            T27
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigate"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/projects" ? "active" : null
                  }`}
                  aria-current="page"
                  to="/projects"
                >
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/contactus" ? "active" : null
                  }`}
                  to="/contactus"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {localStorage.getItem("token") ? (
                <>
                  {/* <i
                    className="fa-solid fa-file-circle-plus mx-2"
                    role="button"
                    
                  ></i>
                  <i
                    className="fa-solid fa-user-plus mx-2 "
                    role="button"
                    
                  ></i> */}
                  <i
                    className="fa-solid fa-circle-user mx-2 "
                    role="button"
                    onClick={() => navigate("/user")}
                  ></i>
                  <i
                    className="fa-solid fa-right-from-bracket mx-2"
                    role="button"
                    onClick={() => onClick()}
                  ></i>
                </>
              ) : (
                <i
                  className="fa-solid fa-circle-user mx-2 "
                  role="button"
                  onClick={() => navigate("/login")}
                ></i>
              )}
            </form>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  );
};
