import type { CandidateMinimal } from "@/types/candidate";
import type { CompetencyMinimal } from "@/types/competency";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { SearchIcon } from "lucide-react";

interface ScheduleInterviewerHeaderProps {
  competency: CompetencyMinimal;
  candidate: CandidateMinimal;
  setSearchText: (text: string) => void;
  searchInput: string;
  setSearchInput: (text: string) => void;
}

const ScheduleInterviewerHeader: React.FC<ScheduleInterviewerHeaderProps> = ({
  competency,
  candidate,
  searchInput,
  setSearchInput,
  setSearchText,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: 2,
        px: { xs: 1, md: 3 },
        py: { xs: 2, md: 3 },
        backgroundColor: "#fafafa",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight={600}>
        Schedule Interview for {candidate.first_name} {candidate.last_name}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary">
        Select interviewers for the competency:{" "}
        <strong>{competency.competency_name}</strong>
      </Typography>

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
    </Box>
  );
};

export default ScheduleInterviewerHeader;
