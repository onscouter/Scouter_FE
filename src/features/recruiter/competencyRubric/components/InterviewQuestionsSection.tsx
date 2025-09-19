import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import QuestionItem from "./QuestionItem";
import AddQuestionButton from "./AddQuestionButton";
import {
  removeQuestion,
  selectQuestions,
  updateQuestion,
} from "@/store/newCompetencySlice";
import type { RootState } from "@/store";
import type { InterviewQuestion } from "@/types/interview";

interface InterviewQuestionsSectionProps {
  competency_public_id: string;
  editable: boolean;
}

const InterviewQuestionsSection: React.FC<InterviewQuestionsSectionProps> = ({
  competency_public_id,
  editable,
}) => {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) =>
    selectQuestions(state, competency_public_id)
  );

  const handleSaveQuestion = (updated: InterviewQuestion) => {
    dispatch(
      updateQuestion({
        competency_public_id,
        interview_question_public_id: updated.interview_question_public_id,
        newText: updated.question_text,
        newType: updated.type,
      })
    );
  };

  const handleDeleteQuestion = (interview_question_public_id: string) => {
    dispatch(
      removeQuestion({ competency_public_id, interview_question_public_id })
    );
  };

  return (
    <Box>
      {questions.map((question: InterviewQuestion, index: number) => (
        <QuestionItem
          key={question.interview_question_public_id}
          index={index + 1}
          editable={editable}
          question={question}
          onSave={handleSaveQuestion}
          onDelete={() =>
            handleDeleteQuestion(question.interview_question_public_id)
          }
        />
      ))}
      {editable && (
        <AddQuestionButton
          competency_public_id={competency_public_id}
          index={questions.length + 1}
        />
      )}
    </Box>
  );
};

export default InterviewQuestionsSection;
