import { Box, Typography, Card, Stack, Checkbox } from "@mui/material";
import { type Competency } from "@/types/competency";

interface SuggestedCompetenciesProps {
  title: string;
  competencies: Competency[];
  selectedCompetencies: Competency[];
  handleToggle: (competency: Competency) => void;
}

const SuggestedCompetencies: React.FC<SuggestedCompetenciesProps> = ({
  title,
  competencies,
  selectedCompetencies,
  handleToggle,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Suggested Competencies for {title}
      </Typography>
      <Typography variant="subtitle1" fontWeight={600} mb={2}>
        Select the competencies you want to evaluate during the interview
        process:
      </Typography>

      <Stack spacing={2}>
        {competencies.map((c) => (
          <Card
            key={c.name}
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              borderColor: selectedCompetencies.includes(c)
                ? "primary.main"
                : "divider",
              transition: "0.2s",
              "&:hover": {
                boxShadow: 2,
              },
            }}
            onClick={() => handleToggle(c)}
          >
            <Box>
              <Typography variant="body1" fontWeight={600}>
                {c.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {c.description}
              </Typography>
            </Box>

            <Checkbox
              checked={selectedCompetencies.some(
                (comp) => comp.name === c.name
              )}
              onChange={(e) => {
                e.stopPropagation();
                handleToggle(c);
              }}
            />
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SuggestedCompetencies;
