import { createBrowserRouter } from "react-router-dom";

import { Home, TaskDetails, Tasks, Overview } from "../pages";
import PreventedRoutes from "./PreventedRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import App from "../App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <PreventedRoutes>
            <Home />
          </PreventedRoutes>
        ),
      },
      {
        path: "/tasks",
        element: (
          <ProtectedRoutes>
            <Tasks />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/tasks/:taskId",
        element: (
          <ProtectedRoutes>
            <TaskDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/stats",
        element: (
          <ProtectedRoutes>
            <Overview />
          </ProtectedRoutes>
        ),
      },
      {
        path: "*",
        element: (
          <>
            <p>Not Available!</p>
          </>
        ),
      },
    ],
  },
]);

export default router;
