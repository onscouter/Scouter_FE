import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Dashboard from "@/layout/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";
import useIsMobile from "@/hooks/useIsMobile";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const isMobile = useIsMobile();
  const navItems = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      path: "/recruiter",
    },
    {
      icon: <WorkOutlineIcon />,
      label: "Jobs",
      path: "/recruiter/jobs",
    },
    {
      icon: <PostAddIcon />,
      label: "Create Job",
      path: "/recruiter/create-job",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setFabOpen(false);
  };

  return (
    <Dashboard>
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        <Box flex={1} p={{ xs: 2, sm: 4 }}>
          <Outlet />
        </Box>
        {!isMobile && (
          <SpeedDial
            ariaLabel="Admin Navigation"
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
