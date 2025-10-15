import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      toast.info("Please sign in to access this page.");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
