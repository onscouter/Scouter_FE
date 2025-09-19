import React from "react";
import {
  Button,
  useTheme,
  type ButtonProps,
  type SxProps,
  type Theme,
} from "@mui/material";

type ColorVariant = "primary" | "secondary" | "gray";

interface AppButtonProps extends ButtonProps {
  colorVariant?: ColorVariant;
  size?: "small" | "medium" | "large";
  sx?: SxProps<Theme>;
}

const AppButton: React.FC<AppButtonProps> = ({
  children,
  colorVariant = "primary",
  size = "medium",
  sx,
  ...rest
}) => {
  const theme = useTheme();

  const baseStyles: SxProps<Theme> = {
    fontWeight: 600,
    borderRadius: 1,
    whiteSpace: "nowrap",
    minWidth: 0,
    width: "100%",
    textTransform: "none",
    transition: "transform 0.2s ease, background-color 0.3s ease",
  };

  const variantStyles: SxProps<Theme> =
    colorVariant === "primary"
      ? {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "scale(1.03)",
          },
        }
      : colorVariant === "secondary"
      ? {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
            transform: "scale(1.03)",
          },
        }
      : {
          backgroundColor: "#E0E0E0",
          color: theme.palette.text.primary,
          "&:hover": {
            backgroundColor: "#D5D5D5",
            transform: "scale(1.03)",
          },
        };

  const sizeStyles: SxProps<Theme> =
    size === "small"
      ? { px: 2, py: 0.75, fontSize: "0.85rem" }
      : size === "large"
      ? { px: 5, py: 1.5, fontSize: "1.125rem" }
      : { px: 4, py: 1.25, fontSize: "1rem" };

  return (
    <Button
      variant="contained"
      disableElevation
      sx={{ ...baseStyles, ...sizeStyles, ...variantStyles, ...sx }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default AppButton;
