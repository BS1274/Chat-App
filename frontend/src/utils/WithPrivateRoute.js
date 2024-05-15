import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const WithPrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Check if currentUser is available
  if (currentUser) {
    return children; // Render children if user is authenticated
  } else {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }
};

export default WithPrivateRoute;
