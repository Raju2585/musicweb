import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  const alertShownRef = useRef(false); 

  useEffect(() => {
    if (!token && !alertShownRef.current) {
      alert("Please login");
      alertShownRef.current = true; 
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/root/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
