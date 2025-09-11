import AppButton from "@/components/AppButton";
import type { RootState } from "@/store";
import { Box, Typography, Button, Link } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface RubricHeaderProps {
  stepIndex: number;
  total: number;
  competencyName: string;
  competencyId: string;
  onNext: () => void;
  onPrev: () => void;
  onSave: () => void;
}

const RubricHeader = ({
  stepIndex,
  total,
  competencyName,
  competencyId,
  onNext,
  onPrev,
  onSave,
}: RubricHeaderProps) => {
  const navigate = useNavigate();
  const questions = useSelector(
    (state: RootState) => state.rubric.rubrics[competencyId]?.questions || []
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        px: { xs: 1, md: 2 },
        py: 1,
        borderRadius: "0 0 16px 16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          onClick={() => navigate("/recruiter-home/create-role")}
          underline="hover"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            fontWeight: 500,
            color: "text.primary",
          }}
        >
          <ArrowLeft size={16} />
          {/* need to figure out redux logic for this */}
          Back to Competencies (Come back to this)
        </Link>

        <Typography variant="body2" color="text.secondary">
          {stepIndex + 1} of {total}
        </Typography>
      </Box>

      <Box textAlign="center" gap={1.5} display="flex" flexDirection="column">
        <Typography variant="h5" fontWeight={700}>
          Interview Rubric
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and customize evaluation criteria for{" "}
          <Box component="span" fontWeight={600} color="text.primary">
            {competencyName}
          </Box>
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
        gap={2}
        alignItems="center"
      >
        <Button
          variant="text"
          startIcon={<ArrowLeft size={16} />}
          disabled={stepIndex === 0}
          onClick={onPrev}
        >
          Previous
        </Button>

        {stepIndex === total - 1 ? (
          <AppButton
            type="submit"
            colorVariant="secondary"
            disabled={questions.length === 0}
            onClick={onSave}
            sx={{ maxWidth: "120px", width: "fit-content" }}
          >
            Complete
          </AppButton>
        ) : (
          <Button
            variant="text"
            endIcon={<ArrowRight size={16} />}
            onClick={onNext}
            disabled={questions.length === 0}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RubricHeader;
