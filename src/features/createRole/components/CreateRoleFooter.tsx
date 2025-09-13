import { Button, Stack } from "@mui/material";
import React from "react";
import { type Competency } from "@/types/competency";

interface CreateRoleFooterProps {
  selected: Competency[];
  handleOnClick?: () => void;
  mode: "create" | "edit";
}

const CreateRoleFooter: React.FC<CreateRoleFooterProps> = ({
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
        {mode === "edit"
          ? "Update Role"
          : "Continue with Selected Competencies"}
      </Button>
    </Stack>
  );
};

export default CreateRoleFooter;
