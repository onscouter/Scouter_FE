import { Box, Chip, Typography } from "@mui/material";
import { type Competency } from "@/types/competency";

interface SelectedCompetenciesProps {
  selected: Competency[];
  onRemove: (comp: Competency) => void;
}

const SelectedCompetencies: React.FC<SelectedCompetenciesProps> = ({
  selected,
  onRemove,
}) => {
  if (selected.length === 0) {
    return (
      <Box
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          backgroundColor: "background.default",
        }}
      >
        <Typography fontWeight={600} color="text.primary">
          No competencies selected yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
        backgroundColor: "background.default",
      }}
    >
      <Typography fontWeight={600} mb={2} color="text.primary">
        Selected Competencies ({selected.length})
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1}>
        {selected.map((comp) => (
          <Chip
            key={comp.competencyId}
            label={comp.competencyName}
            onDelete={() => onRemove(comp)}
            sx={{
              backgroundColor: "primary.light",
              color: "secondary.main",
              fontWeight: 600,
              fontSize: "0.9rem",
              borderRadius: "999px",
              px: 1.5,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectedCompetencies;
