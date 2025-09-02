import { useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { setUser, clearUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";
import apiClient, { setAccessTokenGetter } from "@/api";

const AppAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuthenticated,
    getAccessTokenSilently,
    isLoading: auth0Loading,
    logout,
  } = useAuth0();

  const hasSynced = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setAppLoading(auth0Loading));
  }, [auth0Loading, dispatch]);

  useEffect(() => {
    setAccessTokenGetter(() => getAccessTokenSilently());
  }, [getAccessTokenSilently]);

  useEffect(() => {
    if (hasSynced.current || !isAuthenticated) return;
    hasSynced.current = true;

    const syncUser = async () => {
      dispatch(setAppLoading(true));
      try {
        const res = await apiClient.get("/user/login");
        const user = res.data;

        dispatch(setUser(user));

        if (!user.is_onboarding) {
          toast.info("Complete onboarding to continue.");
          navigate("/access-gate", { replace: true });
          return;
        }

        const role: "admin" | "recruiter" | "interviewer" | undefined =
          user.role;

        const redirectMap: Record<
          "admin" | "recruiter" | "interviewer",
          string
        > = {
          admin: "/admin-dashboard",
          recruiter: "/recruiter-home",
          interviewer: "/interviewer-dashboard",
        };

        if (role && redirectMap[role]) {
          navigate(redirectMap[role], { replace: true });
        } else {
          dispatch(clearUser());

          toast.warning("User has no valid role. Redirecting to access gate.", {
            onClose: () =>
              logout({ logoutParams: { returnTo: window.location.origin } }),
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch /login:", error);
        dispatch(clearUser());

        toast.error("User not found. Logging out...", {
          onClose: () =>
            logout({ logoutParams: { returnTo: window.location.origin } }),
          autoClose: 2000,
        });
      } finally {
        dispatch(setAppLoading(false));
      }
    };

    syncUser();
  }, [isAuthenticated, dispatch, navigate, getAccessTokenSilently, logout]);

  return <>{children}</>;
};

export default AppAuthProvider;
