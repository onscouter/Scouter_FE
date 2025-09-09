import { Button, styled } from "@mui/material";

type AnimatedButtonProps = {
  label: string;
  onClick?: () => void;
  hideBg?: boolean;
};

const StyledButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: 0,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "1rem",
  lineHeight: 1.2,
  height: 40,
  minWidth: "auto",
  color: theme.palette.text.primary,
  backgroundColor: "transparent",
  padding: "0.5rem 1.2rem",
  border: "none",

  "&::before, &::after": {
    content: '""',
    position: "absolute",
    backgroundColor: theme.palette.primary.main,
    transition: "all 0.3s ease",
  },

  "&::before": {
    top: 0,
    left: 0,
    height: "2px",
    width: 0,
    transitionDelay: "0.3s",
  },

  "&::after": {
    top: 0,
    right: 0,
    height: "2px",
    width: 0,
    transitionDelay: "0.3s",
  },

  "& .bottom-border": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    height: "2px",
    width: 0,
    backgroundColor: theme.palette.primary.main,
    transition: "width 0.3s ease",
  },

  "& .left-border, & .right-border": {
    content: '""',
    position: "absolute",
    top: "100%",
    width: "2px",
    height: 0,
    backgroundColor: theme.palette.primary.main,
    transition: "all 0.3s ease",
    transitionDelay: "0.15s",
  },

  "& .left-border": { left: 0 },
  "& .right-border": { right: 0 },

  "&:hover": {
    color: theme.palette.primary.main,
  },

  "&:hover::before, &:hover::after": {
    width: "50%",
  },

  "&:hover .bottom-border": {
    width: "100%",
  },

  "&:hover .left-border, &:hover .right-border": {
    height: "100%",
    top: 0,
  },
}));

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ label, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {label}
      <span className="bottom-border" />
      <span className="left-border" />
      <span className="right-border" />
    </StyledButton>
  );
};

export default AnimatedButton;
