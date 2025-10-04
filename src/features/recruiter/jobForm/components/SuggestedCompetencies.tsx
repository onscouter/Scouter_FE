import { Box, Typography, Card, Stack, Checkbox } from "@mui/material";
import { type CompetencyMinimal } from "@/types/competency";
import { useTheme } from "@mui/material/styles";
import PulseLoader from "react-spinners/PulseLoader";
interface SuggestedCompetenciesProps {
  title: string;
  competencies: CompetencyMinimal[];
  selectedCompetencies: CompetencyMinimal[];
  handleToggle: (competency: CompetencyMinimal) => void;
  isPending: boolean;
}

const SuggestedCompetencies: React.FC<SuggestedCompetenciesProps> = ({
  title,
  competencies,
  selectedCompetencies,
  handleToggle,
  isPending,
}) => {
  const theme = useTheme();
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
        {isPending ? (
          <Box
            sx={{
              minHeight: "240px",
              py: 4,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PulseLoader size={20} color={theme.palette.primary.main} />
          </Box>
        ) : (
          <>
            {competencies.map((c) => (
              <Card
                key={c.competency_public_id}
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
                    {c.competency_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {c.description}
                  </Typography>
                </Box>

                <Checkbox
                  checked={selectedCompetencies.some(
                    (comp) => comp.competency_name === c.competency_name
                  )}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle(c);
                  }}
                />
              </Card>
            ))}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default SuggestedCompetencies;
