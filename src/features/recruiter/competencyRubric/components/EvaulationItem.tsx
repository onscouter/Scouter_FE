import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  useTheme,
} from "@mui/material";
import { Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  getEvaluationLevelOptions,
  type EvaluationLevelValue,
  type RubricLevel,
} from "@/types/rubric";

interface EvaluationItemProps {
  editable: boolean;
  level: RubricLevel;
  onSave: (level: RubricLevel) => void;
  onAddIndicator: (level: EvaluationLevelValue, text: string) => void;
  handleDeleteIndicator: (level: EvaluationLevelValue, id: string) => void;
  onEditIndicator: (
    level: EvaluationLevelValue,
    id: string,
    newText: string
  ) => void;
}

const EvaluationItem: React.FC<EvaluationItemProps> = ({
  editable,
  level,
  onSave,
  onAddIndicator,
  handleDeleteIndicator,
  onEditIndicator,
}) => {
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(level.description);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(
    null
  );
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    setDescription(level.description);
  }, [level]);

  const evaluationOptions = getEvaluationLevelOptions(theme);
  const currentLevelOption = evaluationOptions.find(
    (opt) => opt.value === level.level
  );

  const backgroundColor = currentLevelOption?.color;
  const textColor = currentLevelOption?.textColor;
  const borderColor = currentLevelOption?.borderColor;
  const label = currentLevelOption?.label;

  const handleIndicatorEditStart = (id: string, text: string) => {
    setEditingIndicatorId(id);
    setEditingText(text);
  };

  const handleIndicatorEditSave = () => {
    if (!editingIndicatorId || !editingText.trim()) return;
    onEditIndicator(level.level, editingIndicatorId, editingText.trim());
    setEditingIndicatorId(null);
    setEditingText("");
  };

  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 2,
        p: 2,
        mb: 3,
      }}
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          <Typography fontWeight={700} color={textColor}>
            {label}
          </Typography>
          {editable && !isEditing && (
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
            </IconButton>
          )}
        </Box>
        <Chip
          label={`${level.level}/5`}
          sx={{
            fontWeight: 600,
            color: "white",
            bgcolor: textColor,
            borderRadius: "12px",
            fontSize: "0.875rem",
            height: "28px",
          }}
        />
      </Box>

      {/* Description */}
      <Box mt={1.5}>
        {isEditing ? (
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            size="small"
          />
        ) : (
          <Typography color="text.primary">
            {description || "Example description..."}
          </Typography>
        )}
      </Box>

      {/* Indicators */}
      <Box mt={2}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography fontWeight={600} fontSize="0.95rem">
            Key Indicators:
          </Typography>
          {editable && !isEditing && (
            <Button
              size="small"
              variant="text"
              startIcon={<Plus size={14} />}
              onClick={() => onAddIndicator(level.level, "New Indicator...")}
              sx={{
                textTransform: "none",
                color: textColor,
                px: 1,
                py: 0.5,
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Add
            </Button>
          )}
        </Box>

        <Box component="ul" sx={{ pl: 2, m: 0 }}>
          {level.indicators.map((indicator) => (
            <Box
              key={indicator.evaluation_indicator_public_id}
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              {editingIndicatorId ===
              indicator.evaluation_indicator_public_id ? (
                <TextField
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  size="small"
                  sx={{ flex: 1, mr: 1 }}
                  onBlur={handleIndicatorEditSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleIndicatorEditSave();
                    }
                  }}
                />
              ) : (
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {indicator.indicator_text}
                </Typography>
              )}

              {editable && !isEditing && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleIndicatorEditStart(
                        indicator.evaluation_indicator_public_id,
                        indicator.indicator_text
                      )
                    }
                  >
                    <Pencil size={14} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteIndicator(
                        level.level,
                        indicator.evaluation_indicator_public_id
                      )
                    }
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Save/Cancel buttons */}
      {isEditing && (
        <Box display="flex" gap={1} mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onSave({
                ...level,
                description: description.trim(),
              });
              setIsEditing(false);
            }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setDescription(level.description);
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EvaluationItem;
