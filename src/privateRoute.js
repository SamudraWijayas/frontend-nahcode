import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  return token ? <Route {...rest} element={element} /> : <Navigate to="/" />;
};

export default PrivateRoute;
