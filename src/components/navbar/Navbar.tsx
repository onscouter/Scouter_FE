import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";
import { Search } from "lucide-react";
import { clearUser } from "@/store/authSlice";
import { setAppLoading } from "@/store/appSlice";
import NavbarLg from "./NavbarLg";
import NavbarSm from "./NavbarSm";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/store/authSlice";

type NavbarProps = {
  onCartClick?: () => void;
};

const Navbar: React.FC<NavbarProps> = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleHome = () => {
    if (user) {
      const role = user.role as
        | "admin"
        | "recruiter"
        | "interviewer"
        | undefined;

      const redirectMap: Record<"admin" | "recruiter" | "interviewer", string> =
        {
          admin: "/admin-dashboard",
          recruiter: "/recruiter-home",
          interviewer: "/interviewer-dashboard",
        };

      if (role && redirectMap[role]) {
        navigate(redirectMap[role]);
        return;
      }
    } else {
      navigate("/");
      return;
    }
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/access-gate" },
      authorizationParams: { prompt: "login" },
    });
  };

  const handleLogOut = () => {
    dispatch(clearUser());
    dispatch(setAppLoading(false));
    logout();
  };

  const isMobile = useIsMobile();

  return (
    <header>
      <AppBar
        position="sticky"
        elevation={0}
        color="default"
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid palette.divider",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1440px",
              mx: "auto",
            }}
          >
            <Button
              onClick={handleHome}
              sx={{ minWidth: "auto", backgroundColor: "transparent" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 36,
                  height: 36,
                  backgroundColor: "#F3F3F3",
                  borderRadius: "50%",
                  display: "flex",
                  padding: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Search size={24} color={theme.palette.text.primary} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  letterSpacing: -1,
                  color: "text.primary",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                Scouter
              </Typography>
            </Button>
            {isMobile ? (
              <NavbarSm
                handleLogOut={handleLogOut}
                handleLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            ) : (
              <NavbarLg
                handleLogOut={handleLogOut}
                handleLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
