import TableView from "@/features/shared/table/TableView";
import type { EmployeeInterview } from "@/types/employee";
import InterviewerTableRow from "./InterviewerTableRow";
import type { Order } from "@/types/filters";

interface InterviewerTableProps {
  employees: EmployeeInterview[];
  total: number;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof EmployeeInterview;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onRequestSort: (property: keyof EmployeeInterview) => void;
  rowsPerPageOptions: number[];
  onSelectInterviewer: (employee_public_id: string) => void;
  selectedInterviewerId: string | null;
  isFetching: boolean;
}

const headCells = [
  { id: "action", label: "", width: "5%", sortable: false },
  { id: "employee", label: "Employee", width: "12%" },
  {
    id: "job_title",
    label: "Job Title",
    width: "15%",
  },
  {
    id: "num_interviewers",
    label: "Interviews Conducted",
    align: "center" as const,
    width: "15%",
  },
  {
    id: "last_interview",
    label: "Last Interview",
    width: "15%",
  },
];

const InterviewerTable: React.FC<InterviewerTableProps> = ({
  employees,
  total,
  page,
  rowsPerPage,
  order,
  orderBy,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  rowsPerPageOptions,
  onSelectInterviewer,
  selectedInterviewerId,
  isFetching,
}) => {
  return (
    <TableView
      total={total}
      rows={employees}
      headCells={headCells}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      order={order}
      orderBy={orderBy}
      onRequestSort={onRequestSort}
      rowsPerPageOptions={rowsPerPageOptions}
      isFetching={isFetching}
      renderRow={(interviewer) => (
        <InterviewerTableRow
          key={interviewer.employee_public_id}
          interviewer={interviewer}
          onSelectInterviewer={onSelectInterviewer}
          selectedInterviewerId={selectedInterviewerId}
        />
      )}
    />
  );
};

export default InterviewerTable;
