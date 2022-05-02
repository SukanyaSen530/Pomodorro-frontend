import { Routes, Route } from "react-router-dom";

import { Home, TaskDetails, Tasks, Overview } from "../pages";

import PreventedRoutes from "./PreventedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      {/* Prevented Route */}
      <Route
        path="/"
        element={
          <PreventedRoutes>
            <Home />
          </PreventedRoutes>
        }
      />
      {/* Protected Routes */}
      <Route
        path="/tasks"
        element={
          <ProtectedRoutes>
            <Tasks />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/tasks/:taskId"
        element={
          <ProtectedRoutes>
            <TaskDetails />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoutes>
            <Overview />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<>Not Avaialble!</>} />
    </Routes>
  );
};

export default AllRoutes;
