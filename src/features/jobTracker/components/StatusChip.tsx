import { useTheme } from "@mui/material/styles";
import { Chip, useMediaQuery } from "@mui/material";
import type { JobStatus } from "@/types/job";

const StatusChip: React.FC<{ status: JobStatus }> = ({ status }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Chip
      label={isMobile ? status[0] : status}
      size="small"
      sx={{
        backgroundColor:
          theme.palette.status[
            status.toLowerCase() as keyof typeof theme.palette.status
          ],
        color:
          theme.palette.status[
            `${status.toLowerCase()}Text` as keyof typeof theme.palette.status
          ],
        fontWeight: 500,
        fontSize: "0.65rem",
        height: "22px",
        borderRadius: 1,
        px: { xs: 0.5, sm: 1.5 },
      }}
    />
  );
};

export default StatusChip;
