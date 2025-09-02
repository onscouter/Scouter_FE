import { Box } from "@mui/material";
import NavLinkButton from "./NavLinkButton";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type NavbarLgProps = {
  handleLogOut: () => void;
  handleLogin: () => void;
  handleSignUp: () => void;
  isAuthenticated?: boolean;
};

const NavbarLg: React.FC<NavbarLgProps> = ({
  handleLogOut,
  handleLogin,
  handleSignUp,
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
        <>
          <NavLinkButton key={"Logout"} label="Logout" onClick={handleLogOut} />
          {/* <NavLinkButton
            key={"Profile"}
            label="Profile"
            onClick={handleSignUp}
          />  profile section?*/}
        </>
      ) : (
        <>
          <NavLinkButton
            hideBg={true}
            key={"Login"}
            label="Login"
            onClick={handleLogin}
          />
          <NavLinkButton
            hideBg={false}
            key={"Sign Up"}
            label="Sign Up"
            onClick={handleSignUp}
          />
        </>
      )}
    </Box>
  );
};

export default NavbarLg;
