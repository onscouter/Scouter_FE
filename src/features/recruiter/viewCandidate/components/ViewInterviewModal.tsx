import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { CalendarDays, Clock, UserRound } from "lucide-react";
import type { InterviewWithMeta } from "@/types/interview";
import AppButton from "@/components/AppButton";

type ViewInterviewModalProps = {
  open: boolean;
  onClose: () => void;
  interviewer: InterviewWithMeta | null;
};

const ViewInterviewModal: React.FC<ViewInterviewModalProps> = ({
  open,
  onClose,
  interviewer,
}) => {
  if (!interviewer) return null;

  const scheduledDate = new Date(interviewer.scheduled_at);
  const formattedDate = scheduledDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = scheduledDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Scheduled Interview</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              Candidate
            </Typography>
            <Typography fontWeight={600}>
              {interviewer.candidate.first_name}{" "}
              {interviewer.candidate.last_name}
            </Typography>
            <Typography color="text.secondary">
              {interviewer.candidate.email}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              Competency
            </Typography>
            <Typography fontWeight={500}>
              {interviewer.competency.competency_name}
            </Typography>
            <Typography color="text.secondary">
              {interviewer.competency.description}
            </Typography>
          </Box>

          <Box
            mt={2}
            p={2}
            bgcolor="#f9f9f9"
            borderRadius={2}
            display="flex"
            flexDirection="column"
            gap={1.5}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarDays size={18} />
              <Typography>
                <strong>Interview Date</strong>: {formattedDate}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Clock size={18} />
              <Typography>
                <strong>Time</strong>: {formattedTime}
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <UserRound size={18} />
              <Typography>
                <strong>Interviewer</strong>: {interviewer.interviewer_name},{" "}
                {interviewer.interviewer_role}
              </Typography>
            </Box>
          </Box>

          <Box mt={1}>
            <Typography variant="body2" color="text.secondary">
              {interviewer.interviewer_name} has conducted{" "}
              <strong>{interviewer.total_interviews_conducted}</strong>{" "}
              interviews.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <AppButton
          sx={{ width: "25%" }}
          size="small"
          onClick={onClose}
          variant="contained"
          color="warning"
        >
          Close
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default ViewInterviewModal;
