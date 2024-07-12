import React from "react";
import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import "./Authorization.css";

function Authorization() {
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [validate, setValidate] = useState(false);
  const [validateForm, setValidateForm] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!authForm.email || !authForm.password) {
      setValidateForm(true);
      return;
    }
    try {
      const result = await axiosInstance.post("/auth/login", authForm);
      if (result.status === 200) {
        setUser(result.data.user);
        setAccessToken(result.data.accessToken);
        navigate("/profile");
      }
      setValidateForm(false);
    } catch (error) {
      console.log(error.message);
      setValidate(true);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={(e) => onSubmitHandler(e)}>
        <h2>Вход</h2>
        <input
          className="auth-input"
          type="email"
          placeholder="Логин"
          onChange={(e) =>
            setAuthForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Пароль"
          onChange={(e) =>
            setAuthForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        {validate && <p className="auth-error">Нет пользователя с таким email или паролем</p>}
        {validateForm && <p className="auth-error">Заполните все поля</p>}
        <button className="auth-button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Authorization;
