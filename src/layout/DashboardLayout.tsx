import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/Footer";
// import { useUIContext } from "@/context/UIContext"; // If you use global UI state
// import { useAuth0 } from "@auth0/auth0-react";

type DashboardProps = {
  children: React.ReactNode;
  maxWidth?: string | number;
};

const Dashboard: React.FC<DashboardProps> = ({ children, maxWidth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          maxHeight: "100vh",
          py: { xs: 1, md: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Container
          disableGutters
          sx={{
            maxWidth: maxWidth ?? "100%",
            mx: "auto",
          }}
        >
          {children}
        </Container>
      </Box>

      {/* <Footer /> */}
    </Box>
  );
};

export default Dashboard;
