import { Box, Typography } from "@mui/material";
import type React from "react";

const LandingHeading: React.FC = () => (
  <Box sx={{ textAlign: "center", mb: 6, px: 2 }}>
    <Typography
      variant="h1"
      sx={{
        fontSize: { xs: "2.5rem", sm: "3rem", md: "3.75rem", lg: "4.5rem" },
        fontWeight: 700,
        color: "text.primary",
        mb: 2,
        letterSpacing: -3,
        lineHeight: 1.2,
      }}
    >
      SCOUTER
    </Typography>

    <Typography
      variant="h5"
      sx={{
        fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.875rem" },
        fontWeight: 500,
        color: "text.secondary",
        mb: 1,
      }}
    >
      Wake Up
      <Box component="span" sx={{ color: "primary.main", fontWeight: 500 }}>
        Excited
      </Box>
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
        color: "text.secondary",
        fontWeight: 400,
      }}
    >
      Coming in 2025
    </Typography>
  </Box>
);

export default LandingHeading;
