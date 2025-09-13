import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { LightbulbIcon } from "lucide-react";

interface CreateRoleHeaderProps {
  title: string;
  setTitle: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
  handleSuggestClick: () => void;
}

const CreateRoleHeader: React.FC<CreateRoleHeaderProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  handleSuggestClick,
}) => {
  const theme = useTheme();

  return (
    <Box width="100%" mx="auto">
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight={700} mb={1}>
          Create New Role
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Define the position and core competencies you want to evaluate
        </Typography>
      </Box>

      {/* Everything else left-aligned */}
      <Box mb={1}>
        <Typography variant="body1" fontWeight={700} mb={1}>
          What role are you hiring for?
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          mb={4}
        >
          <TextField
            fullWidth
            placeholder="e.g., Investment Analyst, Associate, Vice President"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              border: `2px solid ${theme.palette.primary.light}`,
              borderRadius: 2,
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                height: 56,
                px: 0.5,
                fontSize: "0.95rem",
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<LightbulbIcon />}
            disabled={!title || !description}
            onClick={handleSuggestClick}
            sx={{
              whiteSpace: "nowrap",
              flexShrink: 0,
              backgroundColor:
                title && description
                  ? theme.palette.primary.main
                  : theme.palette.grey[300],
              color:
                title && description ? "#fff" : theme.palette.text.disabled,
              borderRadius: 2,
              height: 56,
              fontWeight: 600,
              px: 3,
              textTransform: "none",
            }}
          >
            Suggest Competencies
          </Button>
        </Stack>
      </Box>

      <Box>
        <Typography variant="body1" fontWeight={700} mb={1}>
          Briefly describe this role
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g., Responsible for analyzing financial data and supporting investment decisions"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
          maxRows={5}
          sx={{
            border: `2px solid ${theme.palette.primary.light}`,
            borderRadius: 2,
            backgroundColor: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              px: 1.5,
              fontSize: "0.95rem",
            },
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          mt={0.5}
          display="block"
        >
          Include a 1-2 sentence overview of the job's focus and
          responsibilities.
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateRoleHeader;
