import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import AppButton from "@/components/AppButton";
import { useNavigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { submitAccessCode } from "../api";
import type { AxiosError } from "axios";
import { setUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import apiClient from "@/api";
import type { RateLimitInfo } from "@/types/rateLimit";

interface FormData {
  token: string;
}

const AccessGateForm: React.FC = () => {
  const { user, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const MAX_ATTEMPTS = 5;
  const LOCK_TIMEOUT = 60;

  const [rateLimits, setRateLimits] = useState<RateLimitInfo[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState<number | null>(null);
  const [lastToast, setLastToast] = useState<string | null>(null);

  const getSecondsUntilReset = (resetIso: string): number => {
    return Math.ceil((new Date(resetIso).getTime() - Date.now()) / 1000);
  };

  const fetchAttempts = async () => {
    try {
      const response = await apiClient.get("/user/access-gate/attempts");
      const limits: RateLimitInfo[] = response.data.limits.map(
        (limit: RateLimitInfo) => ({
          limit: limit.limit,
          remaining: Number(limit.remaining),
          reset: limit.reset,
        })
      );

      setRateLimits(limits);

      const oneMinuteLimit = limits.find((l) => l.limit.startsWith("5"));

      if (oneMinuteLimit) {
        setAttempts(MAX_ATTEMPTS - oneMinuteLimit.remaining);

        if (oneMinuteLimit.remaining <= 0) {
          const secondsUntilReset = getSecondsUntilReset(oneMinuteLimit.reset);
          setIsLocked(true);
          setLockTimer(secondsUntilReset);
        }
      }
    } catch (err) {
      console.error("Failed to fetch rate limits", err);
    }
  };

  useEffect(() => {
    if (!isLocked && lockTimer === null) {
      fetchAttempts();
    }
  }, [isLocked, lockTimer]);

  // Lockout countdown
  useEffect(() => {
    if (isLocked && lockTimer !== null) {
      const timer = setInterval(() => {
        setLockTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsLocked(false);
            setAttempts(0);
            return null;
          }
          return prev! - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isLocked, lockTimer]);

  const showToastOnce = (
    message: string,
    type: "error" | "success" | "warning"
  ) => {
    if (lastToast !== message) {
      if (type === "error") {
        toast.error(message);
      } else if (type === "warning") {
        toast.warning(message);
      } else {
        toast.success(message);
      }
      setLastToast(message);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (!user) {
      showToastOnce("You must be logged in to submit an access code.", "error");
      return;
    }

    if (isLocked) {
      showToastOnce(`Too many attempts. Try again in ${lockTimer}s.`, "error");
      return;
    }

    try {
      const response = await submitAccessCode({
        access_code: data.token.trim(),
      });

      if (!response.data.success) {
        showToastOnce("Access code submission failed", "error");
        return;
      }

      const user = response.data.employee;

      dispatch(setUser(user));

      toast.dismiss();
      setLastToast(null);

      const role: "admin" | "recruiter" | "interviewer" | undefined = user.role;
      const redirectMap: Record<"admin" | "recruiter" | "interviewer", string> =
        {
          admin: "/admin-dashboard",
          recruiter: "/recruiter-home",
          interviewer: "/interviewer-dashboard",
        };

      if (role && redirectMap[role]) {
        showToastOnce(`You've been granted access as a ${role}`, "success");
        navigate(redirectMap[role], { replace: true });
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ detail: string }>;
      const status = axiosErr.response?.status;
      const detail = axiosErr.response?.data?.detail;

      if (status === 429) {
        await fetchAttempts();
        showToastOnce("You're rate-limited. Please wait.", "error");
        return;
      }

      await fetchAttempts();
      showToastOnce(detail || "Invalid code or registration failed", "error");
    } finally {
      reset();
    }
  };

  const onError = () => {
    const errorMessage =
      errors.token?.type === "required"
        ? "Token is required"
        : errors.token?.type === "minLength"
        ? "Must be at least 8 characters"
        : "Invalid token";
    showToastOnce(errorMessage, "error");
  };

  const onCancel = () => {
    toast.dismiss();
    toast.error("Access cancelled");
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
        type="password"
        placeholder="Enter password"
        variant="outlined"
        error={!!errors.token}
        {...register("token", { required: true, minLength: 8 })}
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
          disabled={isLocked}
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
          {isLocked ? `Try again in ${lockTimer}s` : "Submit"}
        </AppButton>
      </Box>
      {!isLocked && (
        <Typography variant="caption" color="textSecondary">
          Attempts remaining: {MAX_ATTEMPTS - attempts}
        </Typography>
      )}

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

export default AccessGateForm;
