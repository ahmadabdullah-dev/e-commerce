import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // or "react-router-dom" for v6
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useForm } from "react-hook-form";
import { useUpdateCurrentEmail, useResendCurrentEmailConfirmationCode} from "../../../lib/hooks/useUser";

const COOLDOWN_MAX = 30;

type Props = {
  sentTo: string;
  onChangeEmail: () => void;
};

type CodeForm = { code: string };
type ResendResult = { type: "success" | "error"; text: string };

export default function ConfirmNewEmail({ sentTo, onChangeEmail }: Props) {
  const navigate = useNavigate();

  const confirmUpdate = useUpdateCurrentEmail();
  const resendCode = useResendCurrentEmailConfirmationCode();

  // Starts at COOLDOWN_MAX because a code was just sent
  const [cooldown, setCooldown] = useState(COOLDOWN_MAX);
  const [resendResult, setResendResult] = useState<ResendResult | null>(null);

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CodeForm>({ defaultValues: { code: "" } });

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onSubmit = (data: CodeForm) => {
    confirmUpdate.mutate(data, {
      onSuccess: () => navigate("/profile"), // change to your route
      onError: () => resetField("code"),
    });
  };

  const handleResend = () => {
    setResendResult(null);
    resendCode.mutate(undefined, {
      onSuccess: (res) => {
        setResendResult({ type: "success", text: res || "Code sent." });
        setCooldown(COOLDOWN_MAX);
      },
      onError: () => {
        setResendResult({
          type: "error",
          text: "Failed to resend code. Please try again.",
        });
      },
    });
  };

  return (
    <>
      <Stack spacing={1} sx={{ mb: 4, alignItems: "center" }}>
        <MarkEmailReadIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Confirm Your Email
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          We sent a confirmation code to{" "}
          <Typography
            component="span"
            variant="body2"
            sx={{ color: "text.primary", fontWeight: 600 }}
          >
            {sentTo}
          </Typography>
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <TextField
            label="Confirmation Code"
            fullWidth
            placeholder="Enter the 6-digit code"
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                autoComplete: "one-time-code",
              },
            }}
            {...register("code", {
              required: "Code is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Code must be 6 digits",
              },
            })}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={confirmUpdate.isPending}
          >
            {confirmUpdate.isPending ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Confirm Email"
            )}
          </Button>

          {confirmUpdate.error && (
            <Alert severity="error" variant="outlined">
              {confirmUpdate.error.message}
            </Alert>
          )}

          <Button
            variant="outlined"
            fullWidth
            disabled={resendCode.isPending || cooldown > 0}
            onClick={handleResend}
          >
            {resendCode.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : cooldown > 0 ? (
              `Resend available in ${cooldown}s`
            ) : (
              "Resend Confirmation Code"
            )}
          </Button>

          {resendResult && (
            <Alert severity={resendResult.type} variant="outlined">
              {resendResult.text}
            </Alert>
          )}

          <Button variant="text" onClick={onChangeEmail}>
            Use a different email
          </Button>
        </Stack>
      </Box>
    </>
  );
}
