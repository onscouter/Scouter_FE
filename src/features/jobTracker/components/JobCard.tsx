import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import { type Job } from "@/types/job";
import StatusChip from "./StatusChip";
import ActionMenu from "./ActionMenu";
import { format } from "date-fns";

interface JobCardProps {
  job: Job;
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  onViewCandidates: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onEdit,
  onDelete,
  onViewCandidates,
}) => {
  const theme = useTheme();

  const createdDate = job.created_at
    ? format(new Date(job.created_at), "MMM dd, yyyy")
    : "—";

  const statusColors: Record<string, string> = {
    ACTIVE: theme.palette.status.active,
    PAUSED: theme.palette.status.paused,
    CLOSED: theme.palette.status.closed,
  };

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: "#fff",
        p: 2.5,
        pl: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        border: `1px solid ${statusColors[job.status] || "#F3F4F6"}`,
        borderLeft: `8px solid ${statusColors[job.status] || "#F3F4F6"}`,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: "action.hover",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box flex={1} pr={2}>
        {/* Title and status */}
        <Box display="flex" alignItems="center" mb={1} flexWrap="wrap">
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{ mr: 1, lineHeight: 1.4 }}
          >
            {job.title}
          </Typography>
          <StatusChip status={job.status} />
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.description}
        </Typography>

        {/* Metadata row */}
        <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5}>
            <CalendarTodayIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              Created {createdDate}
            </Typography>
          </Box>

          <Typography variant="caption" color="text.disabled">
            •
          </Typography>

          <Box display="flex" alignItems="center" gap={0.5}>
            <GroupIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {job.job_applications} candidates
            </Typography>
          </Box>

          <Typography variant="caption" color="text.disabled">
            •
          </Typography>

          <Box display="flex" alignItems="center" gap={0.5}>
            <DescriptionIcon fontSize="small" color="action" />
            <Typography variant="caption" color="text.secondary">
              {job.competencies} competencies
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Action button */}
      <Box
        sx={{
          alignSelf: "start",
          opacity: 0.6,
          transition: "opacity 0.2s",
          "&:hover": { opacity: 1 },
        }}
      >
        <ActionMenu
          jobId={job.public_id}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewCandidates={onViewCandidates}
        />
      </Box>
    </Card>
  );
};

export default JobCard;
