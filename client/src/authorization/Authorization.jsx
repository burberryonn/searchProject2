import React from "react";
import axios from "axios";
import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

import "./Authorization.css";

function Authorization() {
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState(false)
  const [validateForm, setValidateForm] = useState(false)
  const { setUser } = useUser();

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/auth/login", authForm);
      if (result.status === 200) {
        setUser(result.data.user); // см. файл /src/context/userContext.js
        setAccessToken(result.data.accessToken);
        navigate("/profile"); // Переход на главную страницу используя хук navigate
      }
      setValidateForm(true)
    } catch (error) {
      console.log(error.message);
      setValidate(true)
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
        {validate && ( <p>Нет пользователя с таким email или пароль</p>)}
        {validateForm && ( <p>Заполните все поля</p>)}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Authorization;
