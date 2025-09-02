import { Button } from "@mui/material";

interface AlreadyHaveAccessProps {
  onClick: () => void;
}

const AlreadyHaveAccess: React.FC<AlreadyHaveAccessProps> = ({ onClick }) => (
  <Button
    variant="text"
    onClick={onClick}
    color="inherit"
    sx={{
      fontSize: "1.125rem",
      fontWeight: 600,
      color: "text.secondary",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      transition: "color 0.25s ease, text-underline-offset 0.25s ease",
      textDecorationThickness: "1.5px",
      "&:hover": {
        color: "primary.main",
        textUnderlineOffset: "6px",
        backgroundColor: "transparent",
      },
      "&:focus": {
        outline: "2px solid",
        outlineColor: "primary.main",
        outlineOffset: "4px",
      },
    }}
  >
    Already have access? Login
  </Button>
);

export default AlreadyHaveAccess;
