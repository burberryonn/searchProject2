import { useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

function App() {
  return (
    <div className="App">
      {<Navbar/>}
    </div>
  );
}

export default App;
