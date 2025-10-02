import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import router from "./Routes/AllRoutes";

import App from "./App";
import { RouterProvider } from "react-router-dom";
import { AuthProvider, TaskProvider } from "./context";

import "./index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
