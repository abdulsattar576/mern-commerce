 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

const UserProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (!userToken) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <Loader />; // optional loading spinner while checking
  }

  return <>{children}</>;
};

export default UserProtectedRoutes;
