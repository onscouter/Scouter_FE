import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import type { QuestionType } from "@/types/interview";

interface QuestionTypeOption {
  label: string;
  value: string;
  color: string;
  textColor: string;
}

interface QuestionTypeMenuProps {
  type: QuestionType;
  setType: (value: QuestionType) => void;
  questionTypeOptions: QuestionTypeOption[];
}

const QuestionTypeMenu: React.FC<QuestionTypeMenuProps> = ({
  type,
  setType,
  questionTypeOptions,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedOption =
    questionTypeOptions.find((opt) => opt.value === type) ??
    questionTypeOptions[0];

  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        endIcon={<ChevronDown size={14} />}
        sx={{
          fontWeight: 500,
          textTransform: "none",
          borderRadius: 1.5,
          px: 1.8,
          py: 0.7,
          bgcolor: selectedOption.color,
          color: selectedOption.textColor,
          border: `1.5px solid ${selectedOption.textColor}`,
          "&:hover": {
            boxShadow: "0 0 0 2px rgba(0,0,0,0.05)",
          },
        }}
      >
        {selectedOption.label}
      </Button>

      <Menu
        id="question-type-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 0.5,
              borderRadius: 1,
              minWidth: 180,
              boxShadow:
                "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.06)",
              "& .MuiMenu-list": { p: 0 },
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1.1,
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "text.primary",
                transition: "background-color 0.15s ease-in-out",
                "&:hover": { bgcolor: "grey.100" },
                "&.Mui-selected": {
                  bgcolor: (theme) =>
                    questionTypeOptions.find((q) => q.value === type)?.color ??
                    theme.palette.primary.main,
                  color: "white",
                },
                "&:not(:last-of-type)": {
                  borderBottom: "1px solid",
                  borderColor: "divider",
                },
              },
            },
          },
        }}
      >
        {questionTypeOptions.map(({ label, value }) => (
          <MenuItem
            key={value}
            selected={type === value}
            onClick={() => {
              setType(value as QuestionType);
              handleClose();
            }}
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default QuestionTypeMenu;
