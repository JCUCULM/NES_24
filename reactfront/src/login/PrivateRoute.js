import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; // Usa Outlet para representar los hijos de Route

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica la autenticación

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
