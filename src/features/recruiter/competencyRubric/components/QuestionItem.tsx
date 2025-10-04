import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import QuestionTypeMenu from "@/features/recruiter/competencyRubric/components/QuestionTypeMenu";
import {
  type InterviewQuestion,
  type QuestionType,
  getInterviewQuestionTypeOptions,
} from "@/types/interview";

interface QuestionItemProps {
  index: number;
  question?: InterviewQuestion;
  editable?: boolean;
  addMode?: boolean;
  onSave: (question: InterviewQuestion) => void;
  onDelete?: () => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  index,
  question,
  editable = false,
  addMode = false,
  onSave,
  onDelete,
}) => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(addMode);
  const [text, setText] = useState(question?.question_text ?? "");
  const [type, setType] = useState<QuestionType>(
    question?.type ?? "BEHAVIORAL"
  );

  const questionTypeOptions = getInterviewQuestionTypeOptions(theme);
  const selectedOption = questionTypeOptions.find(
    (opt) => opt.value.toLowerCase() === type.toLowerCase()
  );

  useEffect(() => {
    if (question) {
      setText(question.question_text);
      setType(question.type);
    }
  }, [question]);

  const handleSave = () => {
    if (!text.trim()) return;
    onSave({
      interview_question_public_id:
        question?.interview_question_public_id ?? crypto.randomUUID(),
      question_text: text.trim(),
      type,
    });
    if (addMode) {
      setText("");
      setType("BEHAVIORAL");
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (addMode) {
      onDelete?.();
    } else {
      setText(question?.question_text ?? "");
      setType(question?.type ?? "BEHAVIORAL");
      setIsEditing(false);
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {/* Left Section: Index + Question Content */}
      <Stack direction="row" spacing={2} flex={1} alignItems="flex-start">
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: theme.palette.primary.main,
            color: "black",
            fontWeight: 600,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {index}
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          {isEditing ? (
            <>
              <TextField
                placeholder="Enter your question here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                multiline
                minRows={2}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />

              <Stack direction="row" spacing={1.5} mt={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={!text.trim()}
                  startIcon={<Check size={14} />}
                  sx={{ fontWeight: 500 }}
                >
                  Save
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancel}
                  startIcon={<X size={14} />}
                  sx={{ fontWeight: 500 }}
                >
                  Cancel
                </Button>
              </Stack>
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                  whiteSpace: "pre-line",
                }}
              >
                {question?.question_text}
              </Typography>

              <Chip
                label={selectedOption?.label ?? type}
                sx={{
                  backgroundColor: selectedOption?.color,
                  color: selectedOption?.textColor,
                  border: `1.5px solid ${selectedOption?.textColor}`,
                  fontWeight: 500,
                  textTransform: "capitalize",
                  borderRadius: 2,
                  height: 24,
                  px: 1,
                  alignSelf: "flex-start",
                }}
              />
            </Box>
          )}
        </Box>
      </Stack>

      {/* Right Section: Actions or Menu */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 1,
          ml: 2,
          mt: 0.5,
        }}
      >
        {isEditing ? (
          <QuestionTypeMenu
            type={type}
            setType={setType}
            questionTypeOptions={questionTypeOptions}
          />
        ) : (
          editable && (
            <Stack direction="row" spacing={0.5}>
              <IconButton
                size="small"
                onClick={() => setIsEditing(true)}
                sx={{
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                <Pencil size={16} />
              </IconButton>

              <IconButton
                size="small"
                onClick={onDelete}
                sx={{
                  "&:hover": { color: theme.palette.error.main },
                }}
              >
                <Trash2 size={16} />
              </IconButton>
            </Stack>
          )
        )}
      </Box>
    </Box>
  );
};

export default QuestionItem;
