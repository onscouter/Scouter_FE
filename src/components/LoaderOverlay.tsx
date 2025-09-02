import { Box } from "@mui/material";
import DotLoader from "react-spinners/DotLoader";
import React from "react";
import { useTheme } from "@mui/material/styles";

const LoaderOverlay: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <DotLoader size={80} color={theme.palette.primary.main} />
    </Box>
  );
};

export default LoaderOverlay;
