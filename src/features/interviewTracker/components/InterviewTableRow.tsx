import {
  StyledTableCell,
  StyledTableRow,
} from "@/features/shared/table/StyledTable";
import { format } from "date-fns";
import { Chip, Stack, Typography, Button, Link } from "@mui/material";
import type { Job } from "@/types/job";

interface InterviewTableRowProps {
  job: Job;
  onAccessRubric: (jobId: string) => void;
}

const InterviewTableRow: React.FC<InterviewTableRowProps> = ({
  job,
  onAccessRubric,
}) => {
  const interviewDate = job.interview_datetime
    ? new Date(job.interview_datetime)
    : null;

  const formattedDate = interviewDate
    ? format(interviewDate, "EEEE, MMMM d, yyyy")
    : "—";

  const formattedTime = interviewDate ? format(interviewDate, "h:mm a") : "";

  return (
    <StyledTableRow hover>
      {/* Candidate */}
      <StyledTableCell>
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>{job.candidate_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {job.candidate_email}
          </Typography>
        </Stack>
      </StyledTableCell>

      {/* Role */}
      <StyledTableCell>
        <Chip
          label={job.title}
          size="small"
          color="warning"
          variant="soft"
          sx={{ fontWeight: 500 }}
        />
      </StyledTableCell>

      {/* Competency */}
      <StyledTableCell>
        <Typography>{job.competency}</Typography>
      </StyledTableCell>

      {/* Interview Date */}
      <StyledTableCell>
        <Stack>
          <Typography>{formattedDate}</Typography>
          <Typography variant="body2">{formattedTime}</Typography>
        </Stack>
      </StyledTableCell>

      {/* Resume */}
      <StyledTableCell>
        <Link
          href={job.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          download
        >
          Download
        </Link>
      </StyledTableCell>

      {/* Status */}
      <StyledTableCell>
        <Chip
          label={job.status}
          size="small"
          color={job.status === "UPCOMING" ? "info" : "default"}
          variant="soft"
        />
      </StyledTableCell>

      {/* Action */}
      <StyledTableCell>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => onAccessRubric(job.job_position_public_id)}
        >
          Access Rubric
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InterviewTableRow;
