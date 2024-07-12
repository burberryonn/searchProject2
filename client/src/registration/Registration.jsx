import axios from "axios";
import React from "react";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function Registration() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const {user, setUser} = useUser()
  const [validateForm, setValidateForm] = useState(false)
  const [validatePassword, setValidatePassword] = useState(false)
  const createNewUser = async (event) => {
    event.preventDefault();
    if(form.name === '' || form.email === '' || form.password === ''){
      setValidateForm(true)
    }
    if(form.password.length < 5){
      setValidatePassword(true)
    }
    const data= await axiosInstance.post("/auth/registration", form);
    setUser(data.data.user)
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
        {validateForm && (<p>Заполните все поля</p>)}
        {validatePassword&& (<p>Пароль должен быть не менее 5 символов</p>)}
        <button type="submit">зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Registration;
