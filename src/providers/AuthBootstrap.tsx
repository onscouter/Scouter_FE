import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "@/api";
import { clearUser, selectAccessToken, setUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";

interface AuthBootstrapProps {
  children: React.ReactNode;
}

const AuthBootstrap: React.FC<AuthBootstrapProps> = ({ children }) => {
  const dispatch = useDispatch();
  const hasBootstrapped = useRef(false);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (hasBootstrapped.current || accessToken) return;
    hasBootstrapped.current = true;

    console.log("[AuthBootstrap] starting refresh...");
    dispatch(setAppLoading(true));

    apiClient
      .post("/auth/refresh")
      .then((res) => {
        console.log("[AuthBootstrap] refresh success", res.data);
        dispatch(
          setUser({
            user: res.data.employee,
            accessToken: res.data.access_token,
          })
        );
      })
      .catch((err) => {
        console.error("[AuthBootstrap] refresh failed", err);
        dispatch(clearUser());
      })
      .finally(() => {
        console.log("[AuthBootstrap] setting appLoading = false");
        dispatch(setAppLoading(false));
      });
  }, [accessToken, dispatch]);

  return <>{children}</>;
};

export default AuthBootstrap;
