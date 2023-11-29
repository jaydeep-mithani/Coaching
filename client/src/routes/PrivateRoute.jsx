import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

const PrivateRoute = () => {
  // Check if the user is authenticated (you can use your authentication logic here)
  const isAuthenticated = Boolean(getAuthToken());

  return isAuthenticated ? <Outlet /> : <Navigate to="/?login=false" />;
};

export default PrivateRoute;
