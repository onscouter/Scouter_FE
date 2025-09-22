import type { HeadCell } from "@/features/shared/table/TableHeader";
import TableView from "@/features/shared/table/TableView";
import CandidateTableRow from "./CandidateTableRow";
import type { Order } from "@/types/filters";
import type { Application } from "@/types/applicaiton";

interface CandidateTableProps {
  candidates: Application[];
  total: number;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof Application;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onRequestSort: (property: keyof Application) => void;
  rowsPerPageOptions: number[];
  onEdit: (candidateId: string) => void;
  onDelete: (candidateId: string) => void;
  onScheduleInterview: (
    job_interview_public_id: string,
    job_application_public_id: string
  ) => void;
  onViewInterview: (job_interview_public_id: string) => void;
  isFetching: boolean;
}

function extractEvaluationNames(candidates: Application[]): string[] {
  const all = candidates.flatMap((c) =>
    c.interviews.map((i) => i.competency.competency_name)
  );
  return [...new Set(all)];
}

function generateCandidateHeadCells(candidates: Application[]): HeadCell[] {
  const evaluationNames = extractEvaluationNames(candidates);
  const visibleEvaluations = evaluationNames.slice(0, 10);

  return [
    { id: "name", label: "Candidate", sticky: "left", width: "230px" },
    ...visibleEvaluations.map((name) => ({
      id: `eval:${name}`,
      label: name,
      width: "240px",
      align: "center" as const,
      sortable: false,
    })),
    {
      id: "averageScore",
      label: "Avg. Score",
      width: "120px",
      align: "center",
      sortable: false,
    },
    {
      id: "decision",
      label: "Decision",
      sticky: "right",
      width: "140px",
      align: "center",
      sortable: false,
    },
    {
      id: "actions",
      label: "",
      width: "50px",
      align: "center",
      sticky: "right",
      sortable: false,
    },
  ];
}

const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  total,
  page,
  rowsPerPage,
  order,
  orderBy,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  rowsPerPageOptions,
  onEdit,
  onDelete,
  onScheduleInterview,
  onViewInterview,
  isFetching,
}) => {
  const headCells = generateCandidateHeadCells(candidates);
  return (
    <TableView
      total={total}
      rows={candidates}
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
      renderRow={(candidate) => (
        <CandidateTableRow
          key={candidate.job_application_public_id}
          candidate={candidate}
          headCells={headCells}
          onEdit={onEdit}
          onDelete={onDelete}
          onScheduleInterview={onScheduleInterview}
          onViewInterview={onViewInterview}
        />
      )}
    />
  );
};

export default CandidateTable;
