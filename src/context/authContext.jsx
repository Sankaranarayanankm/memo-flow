import React, { createContext, useState } from "react";

export const authContext = createContext({
  token: "",
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider(props) {
  const [token, setToken] = useState("");

  const login = (token) => {
    setToken(token);
  };
  const logout = () => {
    setToken("");
  };
  const defaultValue = {
    token,
    login,
    logout,
  };
  return (
    <authContext.Provider value={defaultValue}>
      {props.children}
    </authContext.Provider>
  );
}
