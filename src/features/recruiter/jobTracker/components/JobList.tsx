import ListView from "@/features/shared/list/ListView";
import JobCard from "./JobCard";
import { type Job } from "@/types/job";

interface JobListProps {
  total: number;
  jobs: Job[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
  rowsPerPageOptions: number[];
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  onViewCandidates: (jobId: string) => void;
}

const JobListView: React.FC<JobListProps> = ({
  jobs,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
  onEdit,
  onDelete,
  onViewCandidates,
}) => (
  <ListView
    total={total}
    cards={jobs}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    rowsPerPageOptions={rowsPerPageOptions}
    renderCard={(job) => (
      <JobCard
        key={job.job_position_public_id}
        job={job}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewCandidates={onViewCandidates}
      />
    )}
  />
);

export default JobListView;
