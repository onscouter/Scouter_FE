import { Box, Chip, Typography } from "@mui/material";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

import type { Interview } from "@/types/interview";

interface EvaluationCellProps {
  evaluation: Interview;
}

const EvaluationCell: React.FC<EvaluationCellProps> = ({ evaluation }) => {
  const { interview_status, score, interview_datetime } = evaluation;

  const interviewDate = evaluation.interview_datetime
    ? format(new Date(evaluation.interview_datetime), "MMM dd, yyyy")
    : "—";

  const normalizedStatus = interview_status.toUpperCase();

  const getStatusIcon = () => {
    switch (normalizedStatus) {
      case "COMPLETED":
        return <CheckCircle size={16} color="#22C55E" />;
      case "SCHEDULED":
      case "RESCHEDULED":
        return <Clock size={16} color="#F59E0B" />;
      default:
        return <XCircle size={16} color="#9CA3AF" />;
    }
  };

  const getScoreChip = () => {
    const isCompleted = normalizedStatus === "COMPLETED";

    return (
      <Chip
        label={isCompleted && score !== null ? score : "N/A"}
        size="small"
        sx={{
          backgroundColor: isCompleted
            ? score !== null && score >= 4
              ? "#34D399"
              : "#FBBF24"
            : "#F3F4F6",
          color: isCompleted ? "#fff" : "#6B7280",
          fontWeight: 600,
          fontSize: "0.75rem",
          px: 1.5,
          borderRadius: 999,
        }}
      />
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: 70 }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={0.75}
        sx={{ mb: 1 }}
      >
        {getStatusIcon()}
        <Typography variant="body2" fontSize="0.8rem">
          {normalizedStatus.replace("_", " ")}
        </Typography>
        {["SCHEDULED", "RESCHEDULED"].includes(normalizedStatus) &&
          interview_datetime && (
            <Typography
              variant="caption"
              fontSize="0.75rem"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              {interviewDate}
            </Typography>
          )}
      </Box>

      {getScoreChip()}
    </Box>
  );
};

export default EvaluationCell;
