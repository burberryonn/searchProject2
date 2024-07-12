import React from "react";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import "./Registration.css";

function Registration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { setUser } = useUser();
  const [validateForm, setValidateForm] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);

  const createNewUser = async (event) => {
    event.preventDefault();
    if (form.name === "" || form.email === "" || form.password === "") {
      setValidateForm(true);
      return;
    }
    if (form.password.length < 5) {
      setValidatePassword(true);
      return;
    }
    try {
      const data = await axiosInstance.post("/auth/registration", form);
      setUser(data.data.user);
      navigate("/profile");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="reg-container">
      <form className="reg-form" onSubmit={(event) => createNewUser(event)}>
        <h2>Регистрация</h2>
        <input
          className="reg-input"
          type="text"
          placeholder="Имя"
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <input
          className="reg-input"
          type="email"
          placeholder="Электронная почта"
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          className="reg-input"
          type="password"
          placeholder="Пароль"
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        {validateForm && <p className="reg-error">Заполните все поля</p>}
        {validatePassword && <p className="reg-error">Пароль должен быть не менее 5 символов</p>}
        <button className="reg-button" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;
