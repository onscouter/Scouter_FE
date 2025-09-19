import { selectUser } from "@/store/authSlice";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { Search as SearchIcon } from "lucide-react";
import { useSelector } from "react-redux";

interface InterviewTrackerHeaderProps {
  setSearchText: (text: string) => void;
  searchInput: string;
  setSearchInput: (text: string) => void;
}

const InterviewTrackerHeader: React.FC<InterviewTrackerHeaderProps> = ({
  setSearchText,
  searchInput,
  setSearchInput,
}) => {
  const employee = useSelector(selectUser);
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            flexShrink: 0,
            mr: { md: "auto" },
          }}
        >
          Welcome, {employee?.first_name} {employee?.last_name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            flexShrink: 0,
            mr: { md: "auto" },
          }}
        >
          Here's your interview schedule for today.
        </Typography>
      </Box>
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
      </Box>
    </Box>
  );
};

export default InterviewTrackerHeader;
