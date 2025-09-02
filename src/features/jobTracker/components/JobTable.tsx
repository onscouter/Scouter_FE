import TableView from "@/features/shared/table/TableView";
import JobTableRow from "./JobTableRow";
import type { Job, Order } from "@/types/job";

const jobHeadCells = [
  { id: "title", label: "Job Title", width: "34%" },
  { id: "status", label: "Status", width: "15%", sortable: false },
  { id: "created_at", label: "Created At", width: "15%" },
  { id: "job_applications", label: "Candidates", width: "15%" },
  { id: "competencies", label: "Competencies", width: "16%" },
  { id: "actions", label: "", width: "5%", sortable: false },
];

interface JobTableProps {
  total: number;
  jobs: Job[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
  order: Order;
  orderBy: keyof Job;
  onRequestSort: (property: keyof Job) => void;
  rowsPerPageOptions: number[];
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  onViewCandidates: (jobId: string) => void;
}

const JobTable: React.FC<JobTableProps> = ({
  jobs,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  order,
  orderBy,
  onRequestSort,
  rowsPerPageOptions,
  onEdit,
  onDelete,
  onViewCandidates,
}) => (
  <TableView
    total={total}
    rows={jobs}
    headCells={jobHeadCells}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    order={order}
    orderBy={orderBy}
    onRequestSort={onRequestSort}
    rowsPerPageOptions={rowsPerPageOptions}
    renderRow={(job) => (
      <JobTableRow
        key={job.public_id}
        job={job}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewCandidates={onViewCandidates}
      />
    )}
  />
);

export default JobTable;
