import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import LoaderOverlay from "@/components/LoaderOverlay";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component: Component,
}) => {
  const loading = useAuthGuard();
  const user = useSelector(selectUser);
  if (loading) return <LoaderOverlay />;
  if (user) return <Component />;
  return null;
};

export default AuthenticationGuard;
