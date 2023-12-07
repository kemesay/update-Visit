import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

function PrivateRoutes() {
  const token = localStorage.getItem('token');
  return token !== null ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
