import type { Competency } from "@/types/competency";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import InterviewQuestionsSection from "./InterviewQuestionsSection";
import EvaluationCriteriaSection from "./EvaluationCriteriaSection";
import { PencilLine } from "lucide-react";

const RubricEditor = ({ competency }: { competency: Competency }) => {
  const [editingQuestions, setEditingQuestions] = useState(false);
  const [editingCriteria, setEditingCriteria] = useState(false);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Interview Questions</Typography>
        <Button
          size="small"
          variant="text"
          startIcon={<PencilLine size={14} />}
          onClick={() => setEditingQuestions(!editingQuestions)}
          sx={{
            ml: 1,
            mt: 1,
            fontWeight: 500,
            textTransform: "none",
            color: "primary.dark",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          {editingQuestions ? "Done Editing" : "Edit Rubric"}
        </Button>
      </Box>

      <InterviewQuestionsSection
        competencyId={competency.id}
        editable={editingQuestions}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Evaluation Criteria</Typography>

        <Button
          size="small"
          variant="text"
          startIcon={<PencilLine size={14} />}
          onClick={() => setEditingCriteria(!editingCriteria)}
          sx={{
            ml: 1,
            mt: 1,
            fontWeight: 500,
            textTransform: "none",
            color: "primary.dark",
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          {editingCriteria ? "Done Editing" : "Edit Criteria"}
        </Button>
      </Box>
      <EvaluationCriteriaSection
        competencyId={competency.id}
        editable={editingCriteria}
      />
    </Box>
  );
};

export default RubricEditor;
