
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context";

const ProtectedRoutes = ({ children }) => {
  const {
    authState: {
      user: { token },
    },
  } = useAuthContext();

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;