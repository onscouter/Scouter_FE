import LandingLayout from "@/layout/LandingLayout";
import { Box } from "@mui/material";
import React from "react";
import AlreadyHaveAccess from "@/features/landing/components/AlreadyHaveAccess";
import HeroLogo from "@/features/landing/components/HeroLogo";
import LandingHeading from "@/features/landing/components/LandingHeading";
import WaitlistForm from "@/features/landing/components/WaitlistForm";
import WaitlistSuccess from "@/features/landing/components/WaitlistSuccess";
import { useAuth0 } from "@auth0/auth0-react";
import useIsMobile from "@/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, selectUser, setUser } from "@/store/authSlice";
import apiClient from "@/api";
import { toast } from "react-toastify";

const LandingPage = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const isMobile = useIsMobile();

  const handleLogin = async () => {
    if (!isAuthenticated) {
      await loginWithRedirect({
        appState: { returnTo: "/access-gate" },
        authorizationParams: { prompt: "login" },
      });
      return;
    }

    try {
      const res = await apiClient.get("/user/access-gate/verify");
      const user = res.data;

      if (!user.success) {
        dispatch(clearUser());

        toast.warning("User verification failed. Please log in again.", {
          onClose: () =>
            logout({ logoutParams: { returnTo: window.location.origin } }),
          autoClose: 2000,
        });
      }

      const role = user.role as
        | "admin"
        | "recruiter"
        | "interviewer"
        | undefined;

      const redirectMap: Record<"admin" | "recruiter" | "interviewer", string> =
        {
          admin: "/admin-dashboard",
          recruiter: "/recruiter-home",
          interviewer: "/interviewer-dashboard",
        };

      if (role && role in redirectMap) {
        dispatch(setUser(user));
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
      console.error("Login flow failed:", error);

      toast.error("Authentication failed. Logging out...", {
        onClose: () =>
          logout({ logoutParams: { returnTo: window.location.origin } }),
        autoClose: 2000,
      });
    }
  };

  return (
    <LandingLayout>
      <Box
        sx={{
          mt: { xs: 4, sm: 0 },
          minHeight: { xs: "auto ", sm: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 4 },
          py: { xs: 4, sm: 6 },
          gap: { xs: 5, sm: 5, md: 1 },
          textAlign: "center",
        }}
      >
        <HeroLogo />
        <LandingHeading />

        <Box id="waitlist-section" mb={3}>
          {isSubmitted ? (
            <WaitlistSuccess show={isSubmitted} />
          ) : (
            <WaitlistForm
              setEmail={setEmail}
              setIsEmailValid={setIsEmailValid}
              setIsSubmitted={setIsSubmitted}
            />
          )}
        </Box>

        <AlreadyHaveAccess onClick={handleLogin} />
      </Box>
    </LandingLayout>
  );
};

export default LandingPage;
