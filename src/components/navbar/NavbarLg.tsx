import { Box } from "@mui/material";
import AnimatedButton from "@/components/AnimatedButton";

type NavbarLgProps = {
  handleLogOut: () => void;
  handleLogin: () => void;
  isAuthenticated?: boolean;
};

const NavbarLg: React.FC<NavbarLgProps> = ({
  handleLogOut,
  handleLogin,
  isAuthenticated,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        gap: { xs: 1, md: 2 },
        flexShrink: 1,
        my: 2,
      }}
    >
      {isAuthenticated ? (
        <AnimatedButton label="Logout" onClick={handleLogOut} />
      ) : (
        <AnimatedButton label="Login" onClick={handleLogin} />
      )}
    </Box>
  );
};

export default NavbarLg;
