import {
  StyledTableCell,
  StyledTableRow,
} from "@/features/shared/table/StyledTable";
import { format } from "date-fns";
import { Chip, Stack, Typography, Button, Link } from "@mui/material";
import ActionMenu from "./ActionMenu";
import type { Interview } from "@/types/job";

interface InterviewTableRowProps {
  interview: Interview;
  // onAccessRubric: (jobId: string) => void;
}

const InterviewTableRow: React.FC<InterviewTableRowProps> = ({ interview }) => {
  const interviewDate = interview.interview_datetime
    ? new Date(interview.interview_datetime)
    : null;

  const formattedDate = interviewDate
    ? format(interviewDate, "MM/d/yyyy")
    : "—";

  const formattedTime = interviewDate ? format(interviewDate, "h:mm a") : "";

  return (
    <StyledTableRow hover>
      {/* Candidate */}
      <StyledTableCell>
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>
            {interview.candidate.first_name} {interview.candidate.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {interview.candidate.email}
          </Typography>
        </Stack>
      </StyledTableCell>

      {/* Role */}
      <StyledTableCell>
        <Chip
          label={interview.job_position.title}
          size="small"
          color="warning"
          variant="filled"
          sx={{ fontWeight: 500 }}
        />
      </StyledTableCell>

      {/* Competency */}
      <StyledTableCell>
        <Typography>{interview.competency.name}</Typography>
      </StyledTableCell>

      {/* Interview Date */}
      <StyledTableCell>
        <Stack>
          <Typography>{formattedDate}</Typography>
          <Typography variant="body2" color="text.secondary">
            {formattedTime}
          </Typography>
        </Stack>
      </StyledTableCell>

      {/* Status */}
      <StyledTableCell>
        <Chip
          label={interview.interview_status}
          size="small"
          color={interview.interview_status === "UPCOMING" ? "info" : "default"}
          variant="soft"
        />
      </StyledTableCell>

      {/* Action */}
      <StyledTableCell align="right" noEllipsis sx={{ pr: 2 }}>
        <ActionMenu
          interviewId={interview.job_interview_public_id}
          // onEdit={onEdit}
          // onDelete={onDelete}
          // onViewCandidates={onViewCandidates}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InterviewTableRow;
