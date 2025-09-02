import { useState } from "react";
import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NavLinkButton from "./NavLinkButton";

type NavbarSmProps = {
  handleLogOut: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  isAuthenticated?: boolean;
};

const NavbarSm: React.FC<NavbarSmProps> = ({
  handleLogOut,
  handleLogin,
  handleSignUp,
  isAuthenticated,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
          role="presentation"
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Box
                sx={{
                  position: "relative",
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: "#F3F3F3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                <SearchIcon sx={{ fontSize: 28, color: "text.primary" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  ml: 1.5,
                  letterSpacing: -1,
                  color: "text.primary",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Scouter
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {isAuthenticated && (
              <Box
                component={Link}
                to="/profile"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textDecoration: "none",
                  color: "text.primary",
                  px: 1,
                  py: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <AccountCircleIcon />
                <Typography variant="body1">Profile</Typography>
              </Box>
            )}
          </Box>

          <Box>
            <Divider sx={{ mb: 2 }} />
            {isAuthenticated ? (
              <NavLinkButton
                label="Logout"
                onClick={() => {
                  toggleDrawer(false)();
                  handleLogOut();
                }}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  justifyContent: "space-around",
                }}
              >
                <NavLinkButton
                  label="Login"
                  onClick={() => {
                    toggleDrawer(false)();
                    handleLogin();
                  }}
                />
                <NavLinkButton
                  label="Sign Up"
                  onClick={() => {
                    toggleDrawer(false)();
                    handleSignUp();
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarSm;
