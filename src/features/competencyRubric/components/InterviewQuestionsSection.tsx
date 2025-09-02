import type { RootState } from "@/store";
import { Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";
import AddQuestionButton from "./AddQuestionButton";
import { useDispatch } from "react-redux";
import { removeQuestion, updateQuestion } from "@/store/rubricSlice";

interface InterviewQuestionsSectionProps {
  competencyId: string;
  editable: boolean;
}

const InterviewQuestionsSection: React.FC<InterviewQuestionsSectionProps> = ({
  competencyId,
  editable,
}) => {
  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.rubric.rubrics[competencyId]?.questions || []
  );

  return (
    <Box>
      <Typography variant="subtitle1">Interview Questions</Typography>

      {questions.map((q, i) => (
        <QuestionItem
          key={q.id}
          index={i + 1}
          editable={editable}
          question={q}
          onSave={(updated) =>
            dispatch(
              updateQuestion({
                competencyId,
                questionId: updated.id,
                newText: updated.text,
              })
            )
          }
          onDelete={() =>
            dispatch(removeQuestion({ competencyId, questionId: q.id }))
          }
        />
      ))}

      <AddQuestionButton
        competencyId={competencyId}
        index={questions.length + 1}
      />
    </Box>
  );
};

export default InterviewQuestionsSection;
