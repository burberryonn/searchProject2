import React from "react";
import axios from "axios";
import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import "./Authorization.css";

function Authorization() {
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) {
      alert("Заполните все поля");
      return;
    }
    try {
        
      const result = await axiosInstance.post("/auth/login", authForm);
      console.log(11111111, result);
      if (result.status === 200) {
        setUser(result.data.user); // см. файл /src/context/userContext.js
        setAccessToken(result.data.accessToken);
        navigate("/profile"); // Переход на главную страницу используя хук navigate
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main">
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <input
          type="email"
          placeholder="Логин"
          onChange={(e) =>
            setAuthForm((prev) => ({ ...prev, email: e.target.value }))
          }
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          onChange={(e) =>
            setAuthForm((prev) => ({ ...prev, password: e.target.value }))
          }
        ></input>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Authorization;
