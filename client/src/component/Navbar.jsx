import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/news" className="nav-link">
          NEWS
        </Link>
        <Link to="/profile" className="nav-link">
          PROFILE
        </Link>
        <Link to="/registration" className="nav-link">
          REGISTRATION
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
