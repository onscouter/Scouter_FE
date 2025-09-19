import { Box, Card, Typography, Stack, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import type { Candidate } from "@/types/candidate";

const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const decisionColors: Record<string, string> = {
    Hire: "#D1FAE5",
    Hold: "#E5E7EB",
    Reject: "#FECACA",
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: "#fff",
        p: 2.5,
        pl: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderLeft: `6px solid ${
          decisionColors[candidate.decision] || "#F3F4F6"
        }`,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: "action.hover",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box flex={1} pr={2}>
        {/* Name and status */}
        <Box display="flex" alignItems="center" mb={1} flexWrap="wrap">
          <Typography variant="h6" fontWeight={600} sx={{ mr: 1 }}>
            {candidate.first_name + " " + candidate.last_name}
          </Typography>
          <Chip
            label={candidate.decision}
            size="small"
            sx={{
              backgroundColor: decisionColors[candidate.decision] || "#F3F4F6",
              color: "#111827",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          />
        </Box>

        {/* Email */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {candidate.email}
        </Typography>

        {/* Stats row */}
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <DoneAllIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {
                candidate.evaluations.filter((e) => e.status === "Completed")
                  .length
              }
              completed
            </Typography>
          </Box>

          <Typography variant="caption" color="text.disabled">
            •
          </Typography>

          <Box display="flex" alignItems="center" gap={0.5}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              Applied {candidate.appliedDate}
            </Typography>
          </Box>

          {candidate.averageScore && (
            <>
              <Typography variant="caption" color="text.disabled">
                •
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Avg. score:
                </Typography>
                <Chip
                  label={candidate.averageScore.toFixed(1)}
                  size="small"
                  sx={{
                    backgroundColor:
                      candidate.averageScore >= 4
                        ? "#34D399"
                        : candidate.averageScore >= 3
                        ? "#FBBF24"
                        : "#F87171",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    borderRadius: 999,
                    px: 1.5,
                  }}
                />
              </Box>
            </>
          )}
        </Stack>
      </Box>
    </Card>
  );
};

export default CandidateCard;
