import { Box } from "@mui/material";
import Options from "@/features/recruiter/home/components/Options";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";

const RecruiterLandingpage = () => {
  const navigate = useNavigate();

  return (
    <>
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
            icon={<SearchIcon color="primary" sx={{ fontSize: 36 }} />}
            handleOnClick={() => navigate("/recruiter/jobs")}
            title="Job Tracker"
            description="View and manage your current jobs"
          />
          <Options
            icon={<PostAddIcon color="primary" sx={{ fontSize: 36 }} />}
            handleOnClick={() => navigate("/recruiter/create-job")}
            title="Create New Job"
            description="Construct your new interview process"
          />
          <Options
            icon={<QuestionAnswerIcon color="primary" sx={{ fontSize: 36 }} />}
            handleOnClick={() => navigate("/interviewer")}
            title="My Interviews"
            description="View and manage your interviews"
          />
        </Box>
      </Box>
    </>
  );
};

export default RecruiterLandingpage;
