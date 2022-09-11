import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";

const Home = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <React.Fragment>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        {/* Navbar Brand*/}
        <a className="navbar-brand ps-1" href="index.html"></a>
        {/* Sidebar Toggle*/}
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
          href="#!"
        >
          {/* <i className="fas fa-bars"></i> */}
        </button>
        <div className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <h2 className="text-bold">Assessment</h2>
        </div>
        {/* Navbar Search*/}
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0"></form>
        {/* Navbar*/}
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4 ">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li className="d-flex justify-content-center">
                <div>
                  <div className="profileImg">
                    {/* <img src={profileImg} alt="Avatar" className="avatar"></img> */}
                  </div>
                  <h6 className="fw-bold mt-2">Anirban</h6>
                </div>
              </li>

              <li className="d-flex justify-content-center py-2">
                <Logout />
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <a
                  className="nav-link collapsed text-white"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon text-white">
                    <i className="fa-solid fa-square-poll-horizontal"></i>
                  </div>
                  Data
                  <div className="ms-2 sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </a>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link
                      className="nav-link collapsed text-white"
                      to="/list"
                      aria-expanded="false"
                      aria-controls="collapseLayout"
                    >
                      <i className="fa-solid fa-list sb-nav-link-icon"></i>
                      List
                    </Link>
                   
                  </nav>
                </div>
              </div>
            </div>
           
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>{props.children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
