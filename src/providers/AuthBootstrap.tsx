import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import apiClient from "@/api";
import { setUser } from "@/store/authSlice";
import LoaderOverlay from "@/components/LoaderOverlay";

interface AuthBootstrapProps {
  children: React.ReactNode;
}

const AuthBootstrap: React.FC<AuthBootstrapProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    apiClient
      .get("/auth/me")
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [dispatch, navigate]);

  if (loading) return <LoaderOverlay />;
  return <>{children}</>;
};

export default AuthBootstrap;
