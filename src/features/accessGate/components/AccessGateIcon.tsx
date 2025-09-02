import React from "react";
import { Box } from "@mui/material";
import { Lock } from "lucide-react";
import { useTheme } from "@mui/material/styles";

const AccessGateIcon: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        backgroundColor: "primary.light",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        mb: 3,
      }}
    >
      <Lock size={32} color={theme.palette.primary.main} />
    </Box>
  );
};

export default AccessGateIcon;
