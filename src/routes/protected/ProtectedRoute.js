import React, { useState } from "react";
import AuthService from "../../services/Auth/AuthService";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isLoggedIn());

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
