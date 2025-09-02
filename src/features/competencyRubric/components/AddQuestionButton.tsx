import { useState } from "react";
import { Button, Box } from "@mui/material";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addQuestion } from "@/store/rubricSlice";
import QuestionItem from "./QuestionItem"; // wherever you put it
import { type InterviewQuestion } from "@/types/rubric"; // or define locally

const AddQuestionButton = ({
  competencyId,
  index,
}: {
  competencyId: string;
  index: number;
}) => {
  const dispatch = useDispatch();
  const [adding, setAdding] = useState(false);

  const handleSave = (question: InterviewQuestion) => {
    dispatch(addQuestion({ competencyId, question }));
    setAdding(false);
  };

  return adding ? (
    <QuestionItem
      index={index}
      addMode
      editable
      onSave={handleSave}
      onDelete={() => setAdding(false)}
    />
  ) : (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
        size="small"
        variant="text"
        startIcon={<Plus size={14} />}
        onClick={() => setAdding(true)}
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
        Add Question
      </Button>
    </Box>
  );
};

export default AddQuestionButton;
