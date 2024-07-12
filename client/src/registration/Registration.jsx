import axios from "axios";
import React from "react";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const {user, setUser} = useUser()
  const createNewUser = async (event) => {
    event.preventDefault();
    const {data} = await axios.post("./api/auth/registration", form);
    setUser(data.user)
    navigate('/profile')
    console.log(data)
  };

  return (
    <div>
      <h2>Форма регистрации</h2>
      <form
        onSubmit={(event) => {
          createNewUser(event);
        }}
      >
        <input
          type="text"
          placeholder="имя"
          onChange={(event) => {
            setForm((prev) => ({ ...prev, name: event.target.value }));
          }}
        ></input>
        <input
          type="text"
          placeholder="электронная почта"
          onChange={(event) => {
            setForm((prev) => ({ ...prev, email: event.target.value }));
          }}
        ></input>
        <input
          type="text"
          placeholder="пароль"
          onChange={(event) => {
            setForm((prev) => ({ ...prev, password: event.target.value }));
          }}
        ></input>
        <button type="submit">зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;
