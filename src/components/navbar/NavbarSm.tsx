import { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AppButton from "@/components/AppButton";
import { useLocation, useNavigate } from "react-router-dom";

type NavbarSmProps = {
  handleLogOut: () => void;
  handleLogin: () => void;
  isAuthenticated: boolean;
  role: "admin" | "recruiter" | "interviewer";
};

const navItems = {
  admin: [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Settings", path: "/admin/settings" },
  ],
  recruiter: [
    { label: "Dashboard", path: "/recruiter" },
    { label: "Candidates", path: "/recruiter/candidates" },
    { label: "Jobs", path: "/recruiter/jobs" },
  ],
  interviewer: [
    { label: "Dashboard", path: "/interviewer" },
    { label: "Schedule", path: "/interviewer/schedule" },
    { label: "Feedback", path: "/interviewer/feedback" },
  ],
};

const NavbarSm: React.FC<NavbarSmProps> = ({
  handleLogOut,
  handleLogin,
  isAuthenticated,
  role,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const links = navItems[role] ?? [];

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

            <List disablePadding>
              {links.map((item) => (
                <ListItemButton
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  selected={pathname === item.path}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                    },
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Box>
            <Divider sx={{ mb: 2 }} />
            {isAuthenticated ? (
              <AppButton
                type="submit"
                colorVariant="primary"
                onClick={handleLogOut}
              >
                Logout
              </AppButton>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <AppButton
                  type="submit"
                  colorVariant="primary"
                  onClick={handleLogin}
                >
                  Login
                </AppButton>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavbarSm;
