import TableView from "@/features/shared/table/TableView";
import InterviewTableRow from "./InterviewTableRow";
import type { Interview, Order } from "@/types/job";

const candidateInterviewHeadCells = [
  { id: "candidate", label: "Candidate", width: "21%" },
  { id: "role", label: "Role", width: "21%" },
  { id: "competency", label: "Competency", width: "20%" },
  { id: "interview_date", label: "Interview Date", width: "16%" },
  { id: "status", label: "Status", width: "12%", sortable: false },
  { id: "action", label: "", width: "5%", sortable: false },
];

interface InterviewTableProps {
  total: number;
  interviews: Interview[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
  order: Order;
  orderBy: keyof Interview;
  onRequestSort: (property: keyof Interview) => void;
  rowsPerPageOptions: number[];
  // onEdit: (interviewId: string) => void;
  // onDelete: (interviewId: string) => void;
  // onViewCandidates: (interviewId: string) => void;
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
  // onEdit,
  // onDelete,
  // onViewCandidates,
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
    renderRow={(interview) => (
      <InterviewTableRow
        key={interview.job_interview_public_id}
        interview={interview}
        // onEdit={onEdit}
        // onDelete={onDelete}
        // onViewCandidates={onViewCandidates}
      />
    )}
  />
);

export default InterviewTable;
