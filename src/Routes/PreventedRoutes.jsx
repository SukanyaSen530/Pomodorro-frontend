import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";

const PreventedRoutes = ({ children }) => {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  if (token) {
    return <Navigate to="/tasks" />;
  }

  return children;
};

export default PreventedRoutes;
