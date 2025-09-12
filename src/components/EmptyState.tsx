import React from "react";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try adjusting your filters or create a new role to get started.",
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
        px: 2,
        width: "100%",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;
