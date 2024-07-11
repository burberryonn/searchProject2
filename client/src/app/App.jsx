import { useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import { Link, Outlet } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <nav className="navbar">
            <Link to="/news" className="nav-link">
              NEWS
            </Link>
            <Link to="/profile" className="nav-link">
              PROFILE
            </Link>
          </nav>
          <Outlet />
    </div>
  );
}

export default App;
