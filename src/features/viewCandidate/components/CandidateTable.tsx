import type { HeadCell } from "@/features/shared/table/TableHeader";
import TableView from "@/features/shared/table/TableView";
import CandidateTableRow from "./CandidateTableRow";
import type { Order } from "@/types/job";
import type { ApplicationOut } from "../api";

interface CandidateTableProps {
  candidates: ApplicationOut[];
  total: number;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onRequestSort: (property: string) => void;
  rowsPerPageOptions: number[];
}

function extractEvaluationNames(candidates: ApplicationOut[]): string[] {
  const all = candidates.flatMap((c) =>
    c.interviews.map((i) => i.competency.name)
  );
  return [...new Set(all)];
}

function generateCandidateHeadCells(candidates: ApplicationOut[]): HeadCell[] {
  const evaluationNames = extractEvaluationNames(candidates);
  const visibleEvaluations = evaluationNames.slice(0, 10);

  return [
    { id: "full_name", label: "Candidate", sticky: "left", width: "240px" },
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
      sticky: "right",
      width: "120px",
      align: "center",
      sortable: false,
    },
    {
      id: "decision",
      label: "Decision",
      sticky: "right",
      width: "140px",
      align: "left",
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
}) => {
  const headCells = generateCandidateHeadCells(candidates);
  console.log(candidates, "here");
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
      orderBy={orderBy as keyof ApplicationOut}
      onRequestSort={onRequestSort}
      rowsPerPageOptions={rowsPerPageOptions}
      renderRow={(candidate) => (
        <CandidateTableRow
          key={candidate.public_id}
          candidate={candidate}
          headCells={headCells}
        />
      )}
    />
  );
};

export default CandidateTable;
