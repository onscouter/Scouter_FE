import { Button, useTheme } from "@mui/material";

type NavLinkButtonProps = {
  label: string;
  onClick?: () => void;
  hideBg?: boolean;
  ariaLabel?: string;
  active?: boolean; // Optional: used for active link state
};

const NavLinkButton = ({
  label,
  onClick,
  hideBg = false,
  ariaLabel,
  active = false,
}: NavLinkButtonProps) => {
  const theme = useTheme();

  const underlineStyle = hideBg
    ? {
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -2,
          left: 0,
          height: "2px",
          width: active ? "100%" : "0%",
          backgroundColor: theme.palette.primary.main,
          transition: "width 0.3s ease",
        },
        "&:hover::after": {
          width: "100%",
        },
      }
    : {};

  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel || label}
      disableRipple
      color="inherit"
      sx={{
        position: "relative",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "1rem",
        lineHeight: 1.2,
        height: 40,
        padding: hideBg ? "0 12px" : "0 18px",
        minWidth: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: hideBg
          ? theme.palette.text.primary
          : theme.palette.primary.contrastText,
        backgroundColor: hideBg ? "transparent" : theme.palette.primary.main,
        borderRadius: hideBg ? 0 : 1,
        transition: "color 0.3s, background-color 0.3s",
        "&:hover": {
          backgroundColor: hideBg ? "transparent" : theme.palette.primary.dark,
          color: hideBg
            ? theme.palette.primary.main
            : theme.palette.primary.contrastText,
        },
        ...underlineStyle,
      }}
    >
      {label}
    </Button>
  );
};

export default NavLinkButton;
