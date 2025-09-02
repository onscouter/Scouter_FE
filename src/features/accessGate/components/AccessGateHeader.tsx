import React from "react";
import { Typography } from "@mui/material";

const AccessGateHeader: React.FC = () => (
  <>
    <Typography variant="h5" fontWeight={600} gutterBottom>
      Access Gate
    </Typography>
    <Typography variant="body1" color="text.secondary" mb={3}>
      Enter the access token to proceed
    </Typography>
  </>
);

export default AccessGateHeader;
