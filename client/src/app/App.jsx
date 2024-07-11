import { useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import Registration from "../registration/Registration";

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
