import { useForm } from "react-hook-form";
import { useResetPasswordAsync } from "../../lib/hooks/useAuth";
import type { ResetPasswordDto } from "../../lib/types/auth";
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Button,
  Alert,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function ResetPasswordForm() {
  const resetPassword  = useResetPasswordAsync();
  const { email } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const decodedEmail = decodeURIComponent(email!);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordDto>({
    defaultValues: { email: decodedEmail, newPassword: "", code: "" },
  });

  const onSubmit = (creds: ResetPasswordDto) => {
    resetPassword.mutate(creds, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper sx={{ p: 4, width: "100%" }}>
          <Typography variant="h3" sx={{ m: 2, textAlign: "center" }}>
            Reset Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Verification code"
                fullWidth
                {...register("code", { required: "Code is required" })}
                error={!!errors.code}
                helperText={errors.code?.message}
              />
              <TextField
                label="New Password"
                type={showPassword ? "text" : "password"}
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={resetPassword.isPending}
              >
                {resetPassword.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Continue"
                )}
              </Button>
              {resetPassword.data?.isSuccess && (
                <Alert severity="success">
                  {resetPassword.data.value}
                </Alert>
              )}
              {resetPassword.error && (
                <Alert severity="error">
                  {resetPassword.error.message}
                </Alert>
              )}
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate("/login")}
              >
                Back to login
              </Link>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
