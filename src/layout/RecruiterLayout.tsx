// layout/RecruiterLayout.tsx
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const RecruiterLayout = () => {
  return (
    <Box display="flex">
      {/* Replace this with your actual Sidebar */}
      <Box width={240} sx={{ borderRight: "1px solid #eee" }}>
        Sidebar
      </Box>

      {/* Main content area */}
      <Box flex={1} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default RecruiterLayout;
