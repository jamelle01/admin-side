import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UsersContextProvider } from "./context/UsersContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
