import React from "react";
import { Box, Container } from "@mui/material";
import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/Footer"; // Optional future layout
// import { useUIContext } from "@/context/UIContext"; // If you use global UI state
// import { useAuth0 } from "@auth0/auth0-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // Future state prep
  // const { isCartOpen, setIsCartOpen } = useUIContext();
  // const { user, isAuthenticated } = useAuth0();
  // const dispatch = useDispatch();

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

export default MainLayout;
