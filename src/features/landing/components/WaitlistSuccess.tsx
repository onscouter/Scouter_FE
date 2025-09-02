import { Box, Fade, Typography, useTheme } from "@mui/material";
import { Mail } from "lucide-react";

interface WaitlistSuccessProps {
  show: boolean;
}

const WaitlistSuccess: React.FC<WaitlistSuccessProps> = ({ show }) => {
  const theme = useTheme();

  return (
    <Fade in={show} timeout={1000}>
      <Box
        sx={{
          px: 2,
          py: 2,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            backgroundColor: "background.paper",
            borderRadius: 2,
            textAlign: "center",
            maxWidth: 480,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.5,
              mb: 2,
            }}
          >
            <Mail size={32} color={theme.palette.success.main} />
            <Typography variant="h6" fontWeight={600}>
              Thank you!
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary">
            You've been added to our waitlist. We'll be in touch soon.
          </Typography>
        </Box>
      </Box>
    </Fade>
  );
};

export default WaitlistSuccess;
