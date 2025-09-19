import React from "react";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReturnButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      startIcon={<ArrowLeft size={18} />}
      variant="text"
      disableElevation
      onClick={() => navigate("/recruiter")}
      sx={{
        fontWeight: 600,
        fontSize: "0.95rem",
        borderRadius: 1,
        color: "text.primary",
        gap: 0.5,
        px: 2,
        py: 1,
        textTransform: "none",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      Back to Dashboard
    </Button>
  );
};

export default ReturnButton;
