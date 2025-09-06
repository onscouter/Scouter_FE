import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import QuestionItem from "./QuestionItem";
import AddQuestionButton from "./AddQuestionButton";
import {
  removeQuestion,
  selectQuestions,
  updateQuestion,
} from "@/store/rubricSlice";
import type { RootState } from "@/store";
import type { InterviewQuestion } from "@/types/rubric";

interface InterviewQuestionsSectionProps {
  competencyId: string;
  editable: boolean;
}

const InterviewQuestionsSection: React.FC<InterviewQuestionsSectionProps> = ({
  competencyId,
  editable,
}) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) =>
    selectQuestions(state, competencyId)
  );

  const handleSaveQuestion = (updated: InterviewQuestion) => {
    dispatch(
      updateQuestion({
        competencyId,
        questionId: updated.id,
        newText: updated.text,
      })
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    dispatch(removeQuestion({ competencyId, questionId }));
  };

  return (
    <Box>
      {questions.map((question, index) => (
        <QuestionItem
          key={question.id}
          index={index + 1}
          editable={editable}
          question={question}
          onSave={handleSaveQuestion}
          onDelete={() => handleDeleteQuestion(question.id)}
        />
      ))}
      {editable && (
        <AddQuestionButton
          competencyId={competencyId}
          index={questions.length + 1}
        />
      )}
    </Box>
  );
};

export default InterviewQuestionsSection;
