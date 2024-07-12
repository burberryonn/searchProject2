import React, { createContext, useState, useContext, ReactNode } from "react";
import { useEffect } from "react";

export const UserContext = createContext({}); // Создаем контекст

export const UserProvider = ({ children }) => {
  // функция-провайдер для контекста
  // Помним, что children - это все, что находится внутри компонента, в данном случае - это  будет все наше приложение
  const [user, setUser] = useState(null); // Здесь храним пользователя

  useEffect(() => {});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {

  const context = useContext(UserContext); // context = { user, setUser }

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context; // { user, setUser }
};
