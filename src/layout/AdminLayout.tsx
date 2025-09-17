import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import Dashboard from "@/layout/DashboardLayout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import useIsMobile from "@/hooks/useIsMobile";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [fabOpen, setFabOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    {
      icon: <DashboardIcon />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <PeopleIcon />,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: <SettingsIcon />,
      label: "Settings",
      path: "/admin/settings",
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
