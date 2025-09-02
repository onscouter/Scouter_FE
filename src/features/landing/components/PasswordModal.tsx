import { Modal, Backdrop, Fade, Typography, Box } from "@mui/material";
import React from "react";

interface PasswordModalProps {
  showPasswordModal: boolean;
  setShowPasswordModal: (show: boolean) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  showPasswordModal,
  setShowPasswordModal,
}) => {
  return (
    <Modal
      open={showPasswordModal}
      onClose={() => setShowPasswordModal(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 300 } }}
    >
      <Fade in={showPasswordModal}>
        <Box
          sx={{
            bgcolor: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
          }}
        >
          <Typography variant="h6">Access Modal</Typography>
          <Typography variant="body2">This is a placeholder modal.</Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PasswordModal;
