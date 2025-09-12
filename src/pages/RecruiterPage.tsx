import LandingLayout from "@/layout/LandingLayout";
import { Box } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import Options from "@/features/recruiter/components/Options";
import { Search, Plus } from "lucide-react";
import theme from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const RecruiterPage = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <LandingLayout>
      <Box
        sx={{
          mt: { xs: 4, sm: 8 },
          minHeight: { xs: "auto", sm: "80vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          gap: { xs: 4, sm: 6 },
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 4, sm: 5 },
            width: "100%",
            maxWidth: "48rem",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Options
            icon={<Search size={36} color={theme.palette.primary.main} />}
            handleOnClick={() => navigate("/recruiter-home/jobs")}
            title="Job Tracker"
            description="View and manage your current jobs"
          />
          <Options
            icon={<Plus size={36} color={theme.palette.primary.main} />}
            handleOnClick={() => navigate("/recruiter-home/create-role")}
            title="Create New Role"
            description="Construct your new interview process"
          />
        </Box>
      </Box>
    </LandingLayout>
  );
};

export default RecruiterPage;
