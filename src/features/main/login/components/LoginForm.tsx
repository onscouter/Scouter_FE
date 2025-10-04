import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField } from "@mui/material";
import { toast } from "react-toastify";
import AppButton from "@/components/AppButton";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { setUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { useLogin } from "@/features/main/login/useLogin";
import { setAppLoading } from "@/store/appSlice";
import type { LoginResponse } from "@/types/api/login";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lastToast, setLastToast] = useState<string | null>(null);

  const { mutate: submitLogin, isPending } = useLogin();

  useEffect(() => {
    dispatch(setAppLoading(isPending));
  }, [isPending, dispatch]);

  const showToastOnce = (
    message: string,
    type: "error" | "success" | "warning"
  ) => {
    if (lastToast !== message) {
      if (type === "error") toast.error(message);
      else if (type === "warning") toast.warning(message);
      else toast.success(message);
      setLastToast(message);
    }
  };

  const onSubmit = (data: FormData) => {
    submitLogin(data, {
      onSuccess: (data: LoginResponse) => {
        const { access_token, employee } = data;

        dispatch(setUser({ user: employee, accessToken: access_token }));

        toast.dismiss();
        setLastToast(null);
        dispatch(
          setUser({
            user: data.employee,
            accessToken: data.access_token,
          })
        );

        const redirectMap: Record<typeof employee.role, string> = {
          admin: "/admin",
          recruiter: "/recruiter",
          interviewer: "/interviewer",
        };

        const redirectTo = redirectMap[employee.role];
        if (redirectTo) {
          showToastOnce(
            `Welcome, ${employee.first_name} ${employee.last_name}`,
            "success"
          );
          navigate(redirectTo, { replace: true });
        } else {
          showToastOnce("Unknown role", "error");
        }

        reset();
      },

      onError: (error: AxiosError | Error) => {
        console.error("Login failed:", error);
        const message =
          (axios.isAxiosError(error) && error.response?.data?.detail) ||
          "Invalid login";

        showToastOnce(message, "error");
      },
    });
  };

  const onError = () => {
    const usernameError =
      errors.username?.type === "required" && "Username is required";
    const passwordError =
      errors.password?.type === "required"
        ? "Password is required"
        : errors.password?.type === "minLength"
        ? "Password must be at least 8 characters"
        : "Invalid password";

    showToastOnce(usernameError || passwordError || "Form error", "error");
  };

  const onCancel = () => {
    toast.dismiss();
    toast.error("Login cancelled");
    navigate("/");
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        fullWidth
        type="text"
        label="Username"
        placeholder="Enter username"
        variant="outlined"
        error={!!errors.username}
        {...register("username", { required: true, minLength: 3 })}
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        placeholder="Enter password"
        variant="outlined"
        error={!!errors.password}
        {...register("password", { required: true, minLength: 8 })}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <AppButton
          onClick={onCancel}
          colorVariant="gray"
          sx={{
            width: "100%",
            bgcolor: "background.default",
            color: "text.primary",
            border: "2px solid #ccc",
            "&:hover": {
              bgcolor: "#e6e6e6",
              transform: "scale(1.03)",
            },
          }}
        >
          Cancel
        </AppButton>
        <AppButton
          // disabled={isLocked}
          type="submit"
          colorVariant="primary"
          sx={{
            width: "100%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
              transform: "scale(1.03)",
            },
          }}
        >
          {/* {isLocked ? `Try again in ${lockTimer}s` : "Submit"} */}
          Submit
        </AppButton>
      </Box>
      {/* {!isLocked && (
        <Typography variant="caption" color="textSecondary">
          Attempts remaining: {MAX_ATTEMPTS - attempts}
        </Typography>
      )} */}

      {/* {isLocked && (
        <Box mt={1} textAlign="center">
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="text-sm text-red-500 underline"
          >
            Not you? Log out
          </button>
        </Box>
      )} */}
    </Box>
  );
};

export default LoginForm;
