import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { type CompetencyMinimal } from "@/types/competency";
import AnimatedButton from "@/components/AnimatedButton";

interface CustomCompetencyFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onAdd: (newComp: CompetencyMinimal) => void;
}

const CustomCompetencyForm: React.FC<CustomCompetencyFormProps> = ({
  showForm,
  setShowForm,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setShowForm(false);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAdd({
      competency_public_id: crypto.randomUUID(),
      competency_name: name.trim(),
      description: description.trim(),
    });
    resetForm();
  };

  return (
    <Box mt={4}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography fontWeight={600}>Custom Competencies</Typography>

        <AnimatedButton
          onClick={() => setShowForm(!showForm)}
          label={showForm ? "Hide Custom Competency" : "Add Custom Competency"}
        />
      </Box>
      <Typography variant="body2" color="text.secondary" mt={1}>
        Add job-specific competencies that aren't covered in the suggestions
        above.
      </Typography>

      {showForm && (
        <Box
          p={3}
          borderRadius={3}
          sx={{ backgroundColor: "#F9FAFB" }}
          display="flex"
          flexDirection="column"
          gap={2}
          mt={2}
        >
          <Typography variant="subtitle2" mb={0.5}>
            Competency Name
          </Typography>
          <TextField
            fullWidth
            placeholder="e.g., ESG Knowledge, Cross-Border Transactions"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            size="medium"
          />

          <Typography variant="subtitle2" mb={0.5}>
            Description
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Describe what this competency involves and why it's important for this role..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            size="medium"
          />

          <Stack direction="row" spacing={2} mt={1}>
            <Button
              variant="outlined"
              onClick={resetForm}
              sx={{ borderRadius: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={!name.trim() || !description.trim()}
              sx={{
                backgroundColor: "#D9C941",
                color: "#000",
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Add Competency
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default CustomCompetencyForm;
