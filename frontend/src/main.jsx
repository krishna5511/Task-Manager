import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>

      <BrowserRouter>

        <App />
         <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="colored"
    />


      </BrowserRouter>

    </AuthProvider>

  </StrictMode>
);