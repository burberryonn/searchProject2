import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Loader from "../ui/Loader";
import Registration from "../registration/Registration";
import Navbar from "../component/Navbar";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from '../../services/axiosInstance';

function App() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const { data } = await axiosInstance.get("/tokens/refresh");
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error);
      navigate("/"); // Перенаправление на страницу логина
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      {/* Другие компоненты */}
    </div>
  );
}

export default App;
