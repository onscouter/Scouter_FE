import ListView from "@/features/shared/list/ListView";
import RubricCard from "@/features/interviewer/interviewRubric/components/RubricCard";

interface Rubric {
  questionNumber: number;
  type: "technical" | "behavioral" | "situational";
  questionText: string;
  description?: string;
}

interface RubricListProps {
  total: number;
  rubrics: Rubric[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newLimit: number) => void;
  rowsPerPageOptions: number[];
}

const RubricListView: React.FC<RubricListProps> = ({
  rubrics,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}) => (
  <ListView
    total={total}
    cards={rubrics}
    page={page}
    rowsPerPage={rowsPerPage}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    rowsPerPageOptions={rowsPerPageOptions}
    renderCard={(rubric) => (
      <RubricCard
        key={rubric.questionNumber}
        questionNumber={rubric.questionNumber}
        type={rubric.type}
        questionText={rubric.questionText}
        description={rubric.description}
      />
    )}
  />
);

export default RubricListView;
