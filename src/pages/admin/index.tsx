import LandingLayout from "@/layout/LandingLayout";
import { Box } from "@mui/material";
import Options from "@/features/recruiter/components/Options";
import { BarChart3, Users, Briefcase } from "lucide-react";
import theme from "@/styles/theme";
import { useNavigate } from "react-router-dom";

const AdminLandingPage = () => {
  const navigate = useNavigate();

  return (
    <LandingLayout>
      <Box
        sx={{
          mt: { xs: 6, sm: 10 },
          px: { xs: 3, sm: 6 },
          py: { xs: 6, sm: 8 },
          minHeight: { xs: "auto", sm: "80vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fit, minmax(260px, 1fr))",
            },
            gap: { xs: 4, sm: 6 },
            width: "100%",
            maxWidth: "64rem",
          }}
        >
          <Options
            icon={<BarChart3 size={36} color={theme.palette.primary.main} />}
            handleOnClick={() => navigate("/admin-home/overview")}
            title="Overview"
            description="View your platform statistics"
          />
          <Options
            icon={<Users size={36} color={theme.palette.primary.main} />}
            handleOnClick={() => navigate("/admin-home/team-directory")}
            title="Team Directory"
            description="View and manage your team members"
          />
          <Options
            icon={<Briefcase size={36} color={theme.palette.primary.main} />}
            handleOnClick={() => navigate("/admin-home/active-roles")}
            title="Active Roles"
            description="View and manage your active roles"
          />
        </Box>
      </Box>
    </LandingLayout>
  );
};

export default AdminLandingPage;
