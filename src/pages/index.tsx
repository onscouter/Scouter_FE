import LandingLayout from "@/layout/LandingLayout";
import { Box } from "@mui/material";
import React from "react";
import AlreadyHaveAccess from "@/features/landing/components/AlreadyHaveAccess";
import HeroLogo from "@/features/landing/components/HeroLogo";
import LandingHeading from "@/features/landing/components/LandingHeading";
import WaitlistForm from "@/features/landing/components/WaitlistForm";
import WaitlistSuccess from "@/features/landing/components/WaitlistSuccess";
// import useIsMobile from "@/hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  console.log(email, isEmailValid);

  const handleLogin = async () => {
    navigate("/login");
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
