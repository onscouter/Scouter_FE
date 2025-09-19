import { Button, Box, Typography } from "@mui/material";

interface OptionsProps {
  handleOnClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Options: React.FC<OptionsProps> = ({
  handleOnClick,
  title,
  description,
  icon,
}) => (
  <Button
    onClick={handleOnClick}
    sx={{
      flex: 1,
      bgcolor: "white",
      border: "2px solid",
      borderColor: "grey.200",
      borderRadius: "16px",
      p: 8,
      transition: "all 0.3s ease",
      boxShadow: 6,
      textTransform: "none",
      "&:hover": {
        bgcolor: "grey.50",
        borderColor: "primary.dark",
        boxShadow: 8,
        transform: "scale(1.05)",
        "& .icon-wrapper": {
          bgcolor: "rgba(212, 202, 58, 0.3)",
        },
      },
    }}
  >
    <Box sx={{ textAlign: "center" }}>
      <Box
        className="icon-wrapper"
        sx={{
          width: 64,
          height: 64,
          bgcolor: "rgba(212, 202, 58, 0.2)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          mb: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        {icon}
      </Box>

      <Typography variant="h6" fontWeight={600} color="text.primary" mb={1}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  </Button>
);

export default Options;
