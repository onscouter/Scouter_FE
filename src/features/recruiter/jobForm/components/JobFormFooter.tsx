import { Button, Stack } from "@mui/material";
import React from "react";
import { type CompetencyMinimal } from "@/types/competency";

interface JobFormFooterProps {
  selected: CompetencyMinimal[];
  handleOnClick?: () => void;
  mode: "create" | "edit";
}

const JobFormFooter: React.FC<JobFormFooterProps> = ({
  selected,
  handleOnClick,
  mode,
}) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <Button
        variant="outlined"
        sx={{
          borderRadius: 2,
          px: 4,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        disabled={!selected.length}
        onClick={handleOnClick}
        sx={{
          borderRadius: 2,
          px: 4,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        {mode === "edit" ? "Update Job" : "Continue with Selected Competencies"}
      </Button>
    </Stack>
  );
};

export default JobFormFooter;
