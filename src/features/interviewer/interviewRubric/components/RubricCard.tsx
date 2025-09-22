import { Box, Card, Chip, Typography, useTheme } from "@mui/material";

interface RubricCardProps {
  questionNumber: number;
  type: "technical" | "behavioral" | "situational";
  questionText: string;
  description?: string;
}

const RubricCard: React.FC<RubricCardProps> = ({
  questionNumber,
  type,
  questionText,
  description,
}) => {
  const theme = useTheme();

  const typeColors: Record<string, string> = {
    technical: theme.palette.success.light,
    behavioral: theme.palette.info.light,
    situational: theme.palette.secondary.light,
  };

  return (
    <Card
      sx={{
        display: "flex",
        borderLeft: `10px solid ${typeColors[type] || "#ccc"}`,
        borderRadius: 2,
        p: 2.5,
        backgroundColor: "#fff",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: "action.hover",
          boxShadow: 3,
        },
      }}
    >
      <Box flex={1}>
        {/* Question header */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Chip
            size="small"
            label={type}
            sx={{
              backgroundColor: typeColors[type],
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          />
          <Typography variant="subtitle2" color="text.secondary">
            Question {questionNumber}
          </Typography>
        </Box>

        {/* Question Text */}
        <Typography fontWeight={600} sx={{ mb: 1 }}>
          {questionText}
        </Typography>

        {/* Optional Description */}
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default RubricCard;
