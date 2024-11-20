import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NoteContextProvider from "./context/noteContext.jsx";
import AuthContextProvider from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
