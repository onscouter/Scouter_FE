import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/store/authSlice";
import LoaderOverlay from "@/components/LoaderOverlay";

type AuthenticationGuardProps = {
  component: React.ComponentType;
};

const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
  component: Component,
}) => {
  const { isAuthenticated, isLoading: auth0Loading } = useAuth0();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const loading = auth0Loading || (isAuthenticated && user === null);
  const needsOnboarding = isAuthenticated && !auth0Loading && user === null;

  useEffect(() => {
    if (needsOnboarding) {
      navigate("/access-gate", { replace: true });
    }
  }, [needsOnboarding, navigate]);

  if (loading) {
    return <LoaderOverlay />;
  }

  if (isAuthenticated && user) {
    return <Component />;
  }

  return null;
};

export default AuthenticationGuard;
