import { Box } from "@mui/material";
import RubricCard from "@/features/interviewer/interviewRubric/components/RubricCard";
import ListView from "@/features/shared/list/ListView";
import { useState, useMemo } from "react";

// Mock rubric data
const mockRubrics = Array.from({ length: 12 }).map((_, i) => ({
  questionNumber: i + 1,
  type: i % 3 === 0 ? "technical" : i % 3 === 1 ? "behavioral" : "situational",
  questionText: `This is a sample question ${
    i + 1
  } — describe a scenario where...`,
  description:
    i % 2 === 0
      ? "This question evaluates the candidate's critical thinking in real-world challenges."
      : undefined,
}));

const ViewRubricPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const total = mockRubrics.length;
  const rowsPerPageOptions = useMemo(
    () => [5, 10, 25].filter((opt) => opt <= total),
    [total]
  );

  const visibleRubrics = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return mockRubrics.slice(start, start + rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <>
      <Box px={{ xs: 2, sm: 3, md: 4 }} py={3}>
        <ListView
          total={total}
          cards={visibleRubrics}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
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
      </Box>
    </>
  );
};

export default ViewRubricPage;
