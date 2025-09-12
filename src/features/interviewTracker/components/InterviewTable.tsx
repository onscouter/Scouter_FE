import TableView from "@/features/shared/table/TableView";
import InterviewTableRow from "./InterviewTableRow";
import type { Job, Order } from "@/types/job";

const candidateInterviewHeadCells = [
  { id: "candidate", label: "Candidate", width: "20%" },
  { id: "role", label: "Role", width: "20%" },
  { id: "competency", label: "Competency", width: "16%" },
  { id: "interview_date", label: "Interview Date", width: "18%" },
  { id: "resume", label: "Resume", width: "10%", sortable: false },
  { id: "status", label: "Status", width: "8%", sortable: false },
  { id: "action", label: "", width: "8%", sortable: false },
];

interface InterviewTableProps {
  total: number;
  interviews: [];
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

const InterviewTable: React.FC<InterviewTableProps> = ({
  interviews,
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
    rows={interviews}
    headCells={candidateInterviewHeadCells}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    order={order}
    orderBy={orderBy}
    onRequestSort={onRequestSort}
    rowsPerPageOptions={rowsPerPageOptions}
    renderRow={(job) => (
      <InterviewTableRow
        key={job.job_position_public_id}
        job={job}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewCandidates={onViewCandidates}
      />
    )}
  />
);

export default InterviewTable;
