import { useState, useEffect } from "react";
import { Navigate,useLocation } from "react-router-dom";
import PropTypes from "prop-types";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially unknown state
  const location=useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/check-auth`, {
          method: "GET",
          credentials: "include", // ✅ Ensures cookies are sent
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("❌ Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [location]);

  if (isAuthenticated === null) {
    return (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// ✅ Add prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;