import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/userContext";
import axios from "axios";
import { setAccessToken } from "../../services/axiosInstance";
function Navbar() {
  const { user, setUser } = useUser();
  const onHandleLogOut = async () => {
    const { data } = await axios.get("api/auth/logout");
    if (data.message === "success") {
      setAccessToken(undefined);
      setUser(undefined);
    }
  };
  return (
    <>
      <nav className="navbar">
        {user ? (
          <>
            <Link to="/news" className="nav-link">
              NEWS
            </Link>
            <Link to="/profile" className="nav-link">
              PROFILE
            </Link>
            <button onClick={onHandleLogOut}>LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/authorization" className="nav-link">
              AUTHORIZATION
            </Link>
            <Link to="/registration" className="nav-link">
              REGISTRATION
            </Link>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
