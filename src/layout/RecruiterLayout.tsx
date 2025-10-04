import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Dashboard from "@/layout/DashboardLayout";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import useIsMobile from "@/hooks/useIsMobile";
import BreadcrumbsNav from "@/components/BreadCrumbs";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const isMobile = useIsMobile();
  const navItems = [
    { label: "Jobs", icon: <SearchIcon />, path: "/recruiter/jobs" },
    {
      label: "Create Job",
      icon: <PostAddIcon />,
      path: "/recruiter/create-job",
    },
    {
      label: "Interviews",
      icon: <QuestionAnswerIcon />,
      path: "/interviewer",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setFabOpen(false);
  };

  return (
    <Dashboard>
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        <BreadcrumbsNav />

        <Box p={{ xs: 1, sm: 2 }}>
          <Outlet />
        </Box>

        {!isMobile && (
          <SpeedDial
            ariaLabel="Recruiter Navigation"
            sx={{ position: "fixed", bottom: 24, right: 24 }}
            icon={<SpeedDialIcon />}
            onClose={() => setFabOpen(false)}
            onOpen={() => setFabOpen(true)}
            open={fabOpen}
            direction="up"
          >
            {navItems.map((item) => (
              <SpeedDialAction
                key={item.label}
                icon={item.icon}
                onClick={() => handleNavigate(item.path)}
                title={item.label}
              />
            ))}
          </SpeedDial>
        )}
      </Box>
    </Dashboard>
  );
};

export default AdminLayout;
