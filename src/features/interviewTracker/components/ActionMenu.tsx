import React, { useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { FileText, Eye } from "lucide-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ActionMenuProps {
  interviewId: string;
  onEdit: (interviewId: string) => void;
  onDelete: (interviewId: string) => void;
  onViewCandidates: (interviewId: string) => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  interviewId,
  onEdit,
  onDelete,
  onViewCandidates,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        aria-controls={open ? "action-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{
          p: 0.5,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="action-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 0.5,
              borderRadius: 1,
              minWidth: 160,
              boxShadow:
                "0px 4px 12px rgba(0, 0, 0, 0.08), 0px 2px 4px rgba(0, 0, 0, 0.06)",
              "& .MuiMenu-list": {
                padding: 0,
              },
              "& .MuiMenuItem-root": {
                px: 2,
                py: 1.2,
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "text.primary",
                transition: "background-color 0.15s ease-in-out",
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "black",
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
        <MenuItem
          onClick={() => {
            // onViewCandidates(jobId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <FileText size={18} />
          </ListItemIcon>
          <ListItemText>View Resume</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            // onEdit(jobId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Eye size={18} />
          </ListItemIcon>
          <ListItemText>Access Rubric</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;
