import React from "react";
import { Box } from "@mui/material";
import AccessGateIcon from "@/features/accessGate/components/AccessGateIcon";
import AccessGateHeader from "@/features/accessGate/components/AccessGateHeader";
import AccessGateForm from "@/features/accessGate/components/AccessGateForm";

const AccessGatePage: React.FC = () => {
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
        }}
      >
        <AccessGateIcon />
        <AccessGateHeader />
        <AccessGateForm />
      </Box>
    </Box>
  );
};

export default AccessGatePage;
