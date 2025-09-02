import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AppButton from "@/components/AppButton";
import React from "react";

interface WaitlistFormProps {
  setEmail: (email: string) => void;
  setIsEmailValid: (isValid: boolean) => void;
  setIsSubmitted: (isSubmitted: boolean) => void;
}

interface FormData {
  email: string;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({
  setEmail,
  setIsEmailValid,
  setIsSubmitted,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const isValid = data.email.includes("@");
    setIsEmailValid(isValid);

    if (isValid) {
      toast.success("You've been added to the waitlist!");
      setEmail(data.email);
      reset();
      setIsSubmitted(true);
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const onError = () => {
    toast.error("Please enter a valid email address");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 1,
        boxShadow: 3,
        px: 3,
        py: 2,
        maxWidth: 1000,
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          placeholder="Your email address"
          error={!!errors.email}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        <AppButton type="submit" colorVariant="secondary" sx={{ width: "50%" }}>
          Join the Waitlist
        </AppButton>
      </Box>
    </Box>
  );
};

export default WaitlistForm;
