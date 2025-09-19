import React from "react";
import { Box } from "@mui/material";
import LoginHeader from "@/features/main/login/components/LoginHeader";
import LoginForm from "@/features/main/login/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        px: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 3, sm: 4 },
          maxWidth: 448,
          width: "100%",
          textAlign: "center",
          gap: 2,
        }}
      >
        <LoginHeader />
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
