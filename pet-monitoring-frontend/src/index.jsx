import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./pages/MainPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainPage />
  </StrictMode>
);
