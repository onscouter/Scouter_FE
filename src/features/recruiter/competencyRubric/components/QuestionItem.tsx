import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Check, X, ChevronDown } from "lucide-react";
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

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

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
        bgcolor: "grey.50",
        borderRadius: 2,
        mb: 1.5,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {/* Left Side: Index + Content */}
      <Box sx={{ display: "flex", gap: 2, flex: 1 }}>
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "black",
            fontWeight: 600,
            fontSize: "0.875rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 0.5,
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
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderColor: "warning.main",
                  },
                }}
              />
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                  disabled={!text.trim()}
                  startIcon={<Check size={14} />}
                  sx={{ px: 2, minWidth: 0, fontWeight: 500 }}
                >
                  Save
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={handleCancel}
                  startIcon={<X size={14} />}
                  sx={{ px: 2, minWidth: 0, fontWeight: 500 }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.5,
                  minHeight: 40,
                  wordBreak: "break-word",
                }}
              >
                {question?.question_text}
              </Typography>
              <Chip
                label={selectedOption?.label ?? type}
                sx={{
                  backgroundColor: selectedOption?.color,
                  color: selectedOption?.textColor,
                  fontWeight: 500,
                  textTransform: "capitalize",
                  borderRadius: 2,
                  width: "auto",
                  maxWidth: "100%",
                  height: "24px",
                  alignSelf: "flex-start",
                }}
              />
            </Box>
          )}
        </Box>
      </Box>

      {/* Right Side: Dropdown or Icons */}
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
          <>
            <Button
              size="small"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              endIcon={<ChevronDown size={14} />}
              sx={{
                fontWeight: 500,
                bgcolor: "primary.light",
                color: "black",
                px: 1.5,
                minWidth: 0,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              {selectedOption?.label ?? type}
            </Button>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={() => setMenuAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              slotProps={{
                paper: {
                  elevation: 3,
                  sx: {
                    mt: 1,
                    minWidth: 180,
                    backgroundColor: "background.paper",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                  },
                },
              }}
            >
              {questionTypeOptions.map(({ label, value, color }) => (
                <MenuItem
                  key={value}
                  onClick={() => {
                    setType(value);
                    setMenuAnchor(null);
                  }}
                  selected={type === value}
                  sx={{
                    px: 2.5,
                    py: 1.25,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    "&.Mui-selected": {
                      backgroundColor: color,
                      color: "white",
                    },
                    "&:hover": {
                      backgroundColor: "grey.100",
                    },
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          editable && (
            <>
              <IconButton onClick={() => setIsEditing(true)}>
                <Pencil size={16} />
              </IconButton>
              <IconButton onClick={onDelete}>
                <Trash2 size={16} />
              </IconButton>
            </>
          )
        )}
      </Box>
    </Box>
  );
};

export default QuestionItem;
