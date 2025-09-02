import { Box, Button, Typography } from "@mui/material";
import { Plus } from "lucide-react";

interface ViewCandidateHeaderProps {
  job_position_title: string;
}

const ViewCandidateHeader: React.FC<ViewCandidateHeaderProps> = ({
  job_position_title,
}) => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        px: { xs: 1, md: 2 },
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Job position */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          flexShrink: 0,
          mr: { md: "auto" },
        }}
      >
        {job_position_title}
      </Typography>

      {/*  Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "flex-end",
          gap: 2,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Button
          startIcon={<Plus size={18} />}
          variant="contained"
          sx={{
            px: 2.5,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            boxShadow: "0 2px 6px rgba(229,193,0,0.25)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "primary.dark",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(229,193,0,0.35)",
            },
            "&:active": {
              backgroundColor: "primary.dark",
              transform: "translateY(0)",
            },
          }}
        >
          New Candidate
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCandidateHeader;
