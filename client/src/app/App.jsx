import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import Registration from "../registration/Registration";
import Navbar from "../component/Navbar";
import { useUser } from "../context/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import Footer from "../component/Footer";

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const checkUser = async () => {
    try {
      const { data } = await axiosInstance.get("/tokens/refresh");
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [setUser]);

  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
