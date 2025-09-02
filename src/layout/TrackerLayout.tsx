import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import { Box, Paper } from "@mui/material";
import ReturnButton from "@/components/ReturnButton";

interface TrackerLayoutProps {
  children: React.ReactNode;
  maxWidth?: string | number;
}

const TrackerLayout = ({ children, maxWidth = "100%" }: TrackerLayoutProps) => {
  return (
    <DashboardLayout maxWidth={maxWidth}>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        <ReturnButton />

        <Paper
          sx={{
            my: { xs: 1, sm: 3 },
            px: 3,
            py: 3,
            maxWidth,
            mx: "auto",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {children}
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default TrackerLayout;
