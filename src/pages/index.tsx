import LandingLayout from "@/layout/LandingLayout";
import { Box } from "@mui/material";
import React from "react";
import AlreadyHaveAccess from "@/features/main/home/components/AlreadyHaveAccess";
import HeroLogo from "@/features/main/home/components/HeroLogo";
import LandingHeading from "@/features/main/home/components/LandingHeading";
import WaitlistForm from "@/features/main/home/components/WaitlistForm";
import WaitlistSuccess from "@/features/main/home/components/WaitlistSuccess";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/authSlice";
import { toast } from "react-toastify";

const LandingPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const employee = useSelector(selectUser);
  console.log(email, isEmailValid);

  const handleLogin = async () => {
    if (!employee) navigate("/login");
    else {
      const redirectMap: Record<typeof employee.role, string> = {
        admin: "/admin",
        recruiter: "/recruiter",
        interviewer: "/interviewer",
      };

      const redirectTo = redirectMap[employee.role];
      if (redirectTo) {
        toast.success(`Welcome, ${employee.first_name} ${employee.last_name}`);
        navigate(redirectTo, { replace: true });
      }
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
