import axios from "axios";
import React from "react";
import { useState } from "react";

function Registration() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const createNewUser = async (event) => {
    event.preventDefault();
    const send = await axios.post("./api/users", form);
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
