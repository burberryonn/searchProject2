import React from "react";
import "./Authorization.css";

function Authorization() {
  return (
    <div className="main">
      <form>
        <input type="email" placeholder="Логин"></input>
        <input type="password" placeholder="Пароль"></input>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Authorization;
