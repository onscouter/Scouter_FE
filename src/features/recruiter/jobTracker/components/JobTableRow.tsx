import {
  StyledTableCell,
  StyledTableRow,
} from "@/features/shared/table/StyledTable";
import { format } from "date-fns";
import StatusChip from "./StatusChip";
import ActionMenu from "./ActionMenu";
import type { Job } from "@/types/job";

interface JobTableRowProps {
  job: Job;
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  onViewCandidates: (jobId: string) => void;
}

const JobTableRow: React.FC<JobTableRowProps> = ({
  job,
  onEdit,
  onDelete,
  onViewCandidates,
}: JobTableRowProps) => {
  const createdDate = job.created_at
    ? format(new Date(job.created_at), "MMM dd, yyyy")
    : "—";

  return (
    <StyledTableRow hover>
      <StyledTableCell>{job.title}</StyledTableCell>

      <StyledTableCell>
        <StatusChip status={job.status} />
      </StyledTableCell>

      <StyledTableCell>{createdDate}</StyledTableCell>

      <StyledTableCell>{job.job_applications}</StyledTableCell>

      <StyledTableCell>{job.competencies} </StyledTableCell>

      <StyledTableCell align="right" noEllipsis sx={{ pr: 2 }}>
        <ActionMenu
          jobId={job.job_position_public_id}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewCandidates={onViewCandidates}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default JobTableRow;
