import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Chip,
  useTheme,
  Stack,
  ListItem,
  List,
} from "@mui/material";
import { Pencil, Plus, Trash2, Check, X } from "lucide-react";
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

  const backgroundColor = currentLevelOption?.color ?? theme.palette.grey[50];
  const textColor = currentLevelOption?.textColor ?? theme.palette.text.primary;
  const borderColor = currentLevelOption?.borderColor ?? textColor;
  const label = currentLevelOption?.label ?? `Level ${level.level}`;

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
        border: `1.5px solid ${borderColor}`,
        borderRadius: 2,
        p: 2.5,
        mb: 3,
        transition: "box-shadow 0.2s ease",
        "&:hover": editable
          ? { boxShadow: "0px 2px 8px rgba(0,0,0,0.06)" }
          : undefined,
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Stack direction="row" alignItems="center" spacing={1} flex={1}>
          <Typography
            fontWeight={700}
            color={textColor}
            sx={{ fontSize: "1rem", lineHeight: 1.3 }}
          >
            {label}
          </Typography>

          {editable && !isEditing && (
            <IconButton
              size="small"
              onClick={() => setIsEditing(true)}
              sx={{
                color: textColor,
                "&:hover": { bgcolor: "transparent", opacity: 0.8 },
              }}
            >
              <Pencil size={16} />
            </IconButton>
          )}
        </Stack>

        <Chip
          label={`${level.level}/5`}
          sx={{
            fontWeight: 600,
            color: "white",
            bgcolor: textColor,
            borderRadius: "12px",
            fontSize: "0.875rem",
            height: "26px",
          }}
        />
      </Stack>

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
            autoFocus
            sx={{
              "& .MuiOutlinedInput-root": {
                fontSize: "0.9rem",
                "& fieldset": {
                  borderColor: borderColor,
                },
                "&:hover fieldset": {
                  borderColor: textColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor: textColor,
                },
              },
            }}
          />
        ) : (
          <Typography
            color="text.primary"
            sx={{
              fontSize: "0.925rem",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {description || "No description yet."}
          </Typography>
        )}
      </Box>

      {/* Indicators */}
      <Box mt={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography fontWeight={600} fontSize="0.95rem">
            Key Indicators
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
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Add
            </Button>
          )}
        </Stack>
        <List dense disablePadding sx={{ mt: 1 }}>
          {level.indicators.map((indicator) => (
            <ListItem
              key={indicator.evaluation_indicator_public_id}
              disableGutters
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                py: 0.2,
                pr: 1,
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
                    if (e.key === "Enter") handleIndicatorEditSave();
                    if (e.key === "Escape") {
                      setEditingIndicatorId(null);
                      setEditingText("");
                    }
                  }}
                />
              ) : (
                <>
                  {/* Bullet + Text */}
                  <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: theme.palette.text.secondary,
                        flexShrink: 0,
                        mr: 1.2,
                        mt: "1px",
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.primary,
                        fontSize: "0.9rem",
                        lineHeight: 1.5,
                        flex: 1,
                      }}
                    >
                      {indicator.indicator_text}
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  {editable && !isEditing && (
                    <Stack direction="row" spacing={0.5}>
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleIndicatorEditStart(
                            indicator.evaluation_indicator_public_id,
                            indicator.indicator_text
                          )
                        }
                        sx={{
                          "&:hover": { color: textColor },
                        }}
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
                        sx={{
                          "&:hover": { color: theme.palette.error.main },
                        }}
                      >
                        <Trash2 size={14} />
                      </IconButton>
                    </Stack>
                  )}
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Save/Cancel buttons */}
      {isEditing && (
        <Stack direction="row" spacing={1.5} mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onSave({ ...level, description: description.trim() });
              setIsEditing(false);
            }}
            startIcon={<Check size={14} />}
            sx={{ fontWeight: 500 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              setDescription(level.description);
              setIsEditing(false);
            }}
            startIcon={<X size={14} />}
            sx={{ fontWeight: 500 }}
          >
            Cancel
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EvaluationItem;
