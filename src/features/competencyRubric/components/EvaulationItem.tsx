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
import type { EvaluationLevel } from "@/types/rubric";

interface EvaluationItemProps {
  editable: boolean;
  level: EvaluationLevel;
  onSave: (level: EvaluationLevel) => void;
  onAddIndicator: (levelKey: string, text: string) => void;
  handleDeleteIndicator: (levelKey: string, id: string) => void;
  onEditIndicator: (levelKey: string, id: string, newText: string) => void;
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
  const [label, setLabel] = useState(level.label);
  const [description, setDescription] = useState(level.description);
  const [editingIndicatorId, setEditingIndicatorId] = useState<string | null>(
    null
  );
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    setLabel(level.label);
    setDescription(level.description);
  }, [level]);

  const paletteKey = level.levelKey === "none" ? "doesNotMeet" : level.levelKey;
  const backgroundColor = theme.palette.evaluationType[paletteKey];
  const textColor =
    theme.palette.evaluationType[
      `${paletteKey}Text` as keyof typeof theme.palette.evaluationType
    ];
  const borderColor =
    theme.palette.evaluationType[
      `${paletteKey}Border` as keyof typeof theme.palette.evaluationType
    ];

  const handleIndicatorEditStart = (id: string, text: string) => {
    setEditingIndicatorId(id);
    setEditingText(text);
  };

  const handleIndicatorEditSave = () => {
    if (!editingIndicatorId || !editingText.trim()) return;
    onEditIndicator(level.levelKey, editingIndicatorId, editingText.trim());
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
      {/* Header Row */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box display="flex" alignItems="center" gap={1} flex={1}>
          {isEditing ? (
            <TextField
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              variant="standard"
              fullWidth
              slotProps={{
                input: {
                  style: {
                    padding: "4px 8px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: textColor,
                  },
                },
              }}
              sx={{
                maxWidth: "90%",
                mt: 1,
                mb: 1,
              }}
            />
          ) : (
            <Typography fontWeight={700} color={textColor}>
              {label}
            </Typography>
          )}
          {editable && !isEditing && (
            <IconButton size="small" onClick={() => setIsEditing(true)}>
              <Pencil size={16} />
            </IconButton>
          )}
        </Box>
        <Chip
          label={`${level.score}/5`}
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

      {/* Key Indicators */}
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
              onClick={() => onAddIndicator(level.levelKey, "New Indicator...")}
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
          {level.indicators.map((indicatorObj) => (
            <Box
              key={indicatorObj.id}
              component="li"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              {editingIndicatorId === indicatorObj.id ? (
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
                  {indicatorObj.text}
                </Typography>
              )}

              {editable && !isEditing && (
                <Box display="flex" alignItems="center" gap={0.5}>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleIndicatorEditStart(
                        indicatorObj.id,
                        indicatorObj.text
                      )
                    }
                  >
                    <Pencil size={14} />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleDeleteIndicator(level.levelKey, indicatorObj.id)
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

      {/* Save/Cancel */}
      {isEditing && (
        <Box display="flex" gap={1} mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onSave({
                ...level,
                label: label.trim(),
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
              setLabel(level.label);
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
