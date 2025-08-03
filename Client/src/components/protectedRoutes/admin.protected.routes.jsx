 import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin-login");
    } else {
      setCheckingAuth(false); // token exists, no redirect
    }
  }, [navigate]);

  // Optional: show a loader until we finish auth check
  if (checkingAuth) return <div>Checking admin access...</div>;

  return <>{children}</>;
};

export default AdminProtectedRoutes;
