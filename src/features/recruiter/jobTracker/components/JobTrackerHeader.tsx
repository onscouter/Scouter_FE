import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon, Plus } from "lucide-react";

interface JobTrackerHeaderProps {
  setSearchText: (text: string) => void;
  searchInput: string;
  setSearchInput: (text: string) => void;
  onNewRole: () => void;
}

const JobTrackerHeader: React.FC<JobTrackerHeaderProps> = ({
  setSearchText,
  searchInput,
  setSearchInput,
  onNewRole,
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
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: "text.primary",
          flexShrink: 0,
          mr: { md: "auto" },
        }}
      >
        Candidate Tracker
      </Typography>

      {/* Search + Button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          width: "100%",
          maxWidth: 500,
        }}
      >
        <TextField
          id="search-roles"
          placeholder="Search roles by title or description..."
          type="search"
          size="small"
          aria-label="Search roles"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchText(searchInput);
            }
          }}
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
        <Button
          startIcon={<Plus size={18} />}
          variant="contained"
          onClick={onNewRole}
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
          New Job
        </Button>
      </Box>
    </Box>
  );
};

export default JobTrackerHeader;
