import { Box } from "@mui/material";
import { Search } from "lucide-react";

const HeroLogo: React.FC = () => (
  <Box
    sx={{
      mb: { xs: 2, sm: 4 },
      transition: "transform 0.3s",
      "&:hover": { transform: "scale(1.03)" },
    }}
  >
    <Box
      sx={{
        position: "relative",
        width: 96,
        height: 96,
        borderRadius: "50%",
        backgroundColor: "background.paper",
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Search size={40} />
      <Box
        sx={{
          position: "absolute",
          top: -8,
          right: -8,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "primary.main",
        }}
      />
    </Box>
  </Box>
);

export default HeroLogo;
