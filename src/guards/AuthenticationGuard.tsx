import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import LoaderOverlay from "@/components/LoaderOverlay";
import { useAuthGuard } from "@/hooks/useAuthGuard";

type AuthenticationGuardProps = {
  children: React.ReactNode;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  children,
}) => {
  const loading = useAuthGuard();
  const user = useSelector(selectUser);
  if (loading) return <LoaderOverlay />;
  if (user) return <>{children}</>;

  return null;
};

export default AuthenticationGuard;
