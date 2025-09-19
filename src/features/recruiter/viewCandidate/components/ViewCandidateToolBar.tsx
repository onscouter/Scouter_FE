import React from "react";
import {
  Toolbar,
  IconButton,
  Tooltip,
  Box,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Table2, List, SearchIcon } from "lucide-react";

interface ViewCandidateToolBarProps {
  setSearchText: (text: string) => void;
  searchInput: string;
  setSearchInput: (text: string) => void;
  viewMode: "table" | "list";
  setViewMode: (mode: "table" | "list") => void;
}

const ViewCandidateToolBar: React.FC<ViewCandidateToolBarProps> = ({
  searchInput,
  setSearchInput,
  setSearchText,
  viewMode,
  setViewMode,
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
        <TextField
          id="search-roles"
          placeholder="Search candidates by name or email..."
          type="search"
          size="small"
          aria-label="Search roles"
          variant="outlined"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(searchInput);
            }
          }}
          value={searchInput}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  sx={{ cursor: "pointer" }}
                  position="end"
                  onClick={() => setSearchText(searchInput)}
                >
                  <SearchIcon size={18} color="#6F6F6F" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            flexGrow: 1,
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover fieldset": {
                borderColor: "primary.light",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0 0 0 3px rgba(229,193,0,0.2)",
              },
            },
          }}
        />
      </Box>
    </Toolbar>
  );
};

export default ViewCandidateToolBar;
