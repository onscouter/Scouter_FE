import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#E5C100", // Clean brand yellow
      contrastText: "#ffffff",
      dark: "#C7A800",
      light: "#FFF7CC", // Subtle soft yellow
    },
    secondary: {
      main: "#7B5E44", // Neutral earthy tone
      contrastText: "#ffffff",
    },
    background: {
      default: "#FAF9F6", // Soft warm background
      paper: "#ffffff",
    },
    text: {
      primary: "#2C2C2C", // Slightly softened black
      secondary: "#6F6F6F", // Mid-gray for paragraphs
      disabled: "#9E9E9E", // Added for better disabled contrast
    },
    divider: "rgba(0, 0, 0, 0.08)", // Slightly lighter for subtler dividers

    status: {
      active: "#BBF7D0", // Soft mint green
      paused: "#FDE68A", // Pastel yellow
      closed: "#E5E7EB", // Light neutral gray
      activeText: "#166534", // Deep green
      pausedText: "#92400E", // Amber
      closedText: "#6B7280", // Muted slate
    },

    questionType: {
      behavioral: "#D1FAE5",
      technical: "#DBEAFE",
      situational: "#EDE9FE",
      behavioralText: "#065F46",
      technicalText: "#1E40AF",
      situationalText: "#6B21A8",
    },

    evaluationType: {
      exceeds: "#ECFDF5",
      above: "#EFF6FF",
      meets: "#FFFBEB",
      below: "#FEF3C7",
      doesNotMeet: "#FEE2E2",

      exceedsText: "#047857",
      aboveText: "#1D4ED8",
      meetsText: "#92400E",
      belowText: "#B45309",
      doesNotMeetText: "#B91C1C",

      exceedsBorder: "#34D399",
      aboveBorder: "#60A5FA",
      meetsBorder: "#FACC15",
      belowBorder: "#F97316",
      doesNotMeetBorder: "#EF4444",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
      letterSpacing: "-0.5px",
      color: "#2C2C2C",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#2C2C2C",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      color: "#6F6F6F",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8, // Slightly more rounded for modern UI
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "0.5rem 1.25rem",
          fontWeight: 600,
          transition: "all 0.2s ease",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            "& fieldset": {
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#C7A800", // on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E5C100", // on focus
              boxShadow: "0 0 0 3px rgba(229, 193, 0, 0.2)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.85rem",
          padding: "6px 10px",
          borderRadius: 6,
        },
      },
    },
  },
});
export default theme;
