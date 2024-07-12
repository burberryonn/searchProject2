import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/userContext";
import axios from "axios";
import { setAccessToken } from "../../services/axiosInstance";
import Loader from "../ui/Loader";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loaders, setLoader] = useState(false);

  const onHandleLogOut = async () => {
    const { data } = await axios.get("api/auth/logout");
    if (data.message === "success") {
      setAccessToken(undefined);
      setUser(undefined);
      navigate("/");
    }
  };

  const loader = () => {
    setTimeout(() => {
      setLoader((prev) => !prev);
    }, 1500);
  };

  useEffect(() => {
    loader();
  }, []);
  return (
    <>
      {!loaders ? (
        <Loader></Loader>
      ) : (
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
                <button onClick={onHandleLogOut}>LOGOUT</button>
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
        </>
      )}
    </>
  );
}

export default Navbar;
