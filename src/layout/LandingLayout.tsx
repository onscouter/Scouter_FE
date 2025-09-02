import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/Footer"; // Optional future layout
// import { useUIContext } from "@/context/UIContext"; // If you use global UI state
// import { useAuth0 } from "@auth0/auth0-react";

type LandingLayoutProps = {
  children: React.ReactNode;
};

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />

      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          maxHeight: "100vh",
          py: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default LandingLayout;
