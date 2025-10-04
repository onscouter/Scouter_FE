import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { selectUser, selectHasAttemptedRefresh } from "@/store/authSlice";

const AuthenticationGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector(selectUser);
  const hasAttemptedRefresh = useSelector(selectHasAttemptedRefresh);
  const location = useLocation();

  if (!hasAttemptedRefresh) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
};

export default AuthenticationGuard;
