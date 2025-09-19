import React from "react";
import {
  Toolbar,
  IconButton,
  Tooltip,
  ButtonGroup,
  Button,
  Box,
  useTheme,
} from "@mui/material";
import { Table2, List } from "lucide-react";
import { statusOptions, type JobStatus } from "@/types/job";

interface JobToolBarProps {
  viewMode: "table" | "list";
  setViewMode: (mode: "table" | "list") => void;
  jobStatus: JobStatus;
  setJobStatus: (status: JobStatus) => void;
}

const JobToolBar: React.FC<JobToolBarProps> = ({
  viewMode,
  setViewMode,
  jobStatus,
  setJobStatus,
}) => {
  const theme = useTheme();

  const iconButtonStyle = (active: boolean) => ({
    backgroundColor: active ? theme.palette.primary.light : "transparent",
    color: active ? "#8B6D00" : theme.palette.text.primary,
    borderRadius: "8px",
    border: active
      ? `1px solid ${theme.palette.primary.main}`
      : "1px solid transparent",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#FFE082",
    },
  });

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: { xs: 1, sm: 2 },
        py: 1,
        gap: 2,
      }}
    >
      {/* View Toggle */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip title="Table View">
          <IconButton
            size="large"
            onClick={() => setViewMode("table")}
            sx={iconButtonStyle(viewMode === "table")}
          >
            <Table2 size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="List View">
          <IconButton
            size="large"
            onClick={() => setViewMode("list")}
            sx={iconButtonStyle(viewMode === "list")}
          >
            <List size={20} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Filter Buttons */}
      <ButtonGroup
        size="small"
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        {statusOptions.map(({ label, value }) => {
          const isSelected = jobStatus === value;

          return (
            <Button
              key={value}
              onClick={() => setJobStatus(value)}
              sx={{
                backgroundColor: isSelected ? "#FFF7CC" : "transparent",
                color: isSelected ? "#8B6D00" : theme.palette.text.primary,
                fontWeight: 600,
                textTransform: "none",
                px: 2,
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: "#FFE082",
                },
              }}
            >
              {label}
            </Button>
          );
        })}
      </ButtonGroup>
    </Toolbar>
  );
};

export default JobToolBar;
