import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Lock } from "lucide-react";

const LoginHeader: React.FC = () => {
  const theme = useTheme();

  return (
    <Box textAlign="center" m={1} p={2}>
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          backgroundColor: theme.palette.primary.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
        }}
      >
        <Lock size={32} color={theme.palette.primary.main} />
      </Box>

      <Typography variant="h5" fontWeight={600}>
        Login
      </Typography>
    </Box>
  );
};

export default LoginHeader;
