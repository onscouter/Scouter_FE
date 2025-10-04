import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";

type DashboardProps = {
  children: React.ReactNode;
};

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
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
          flexGrow: 1,
          py: { xs: 1, md: 2 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Container
          disableGutters
          sx={{
            maxWidth: "100%",
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
