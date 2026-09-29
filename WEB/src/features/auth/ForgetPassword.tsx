import { useForm } from "react-hook-form";
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
  Link,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useForgetPasswordAsync } from "../../lib/hooks/useAuth";

interface ForgetPasswordFormValues {
  email: string;
}

export default function ForgetPasswordForm() {
  const forgetPassword = useForgetPasswordAsync();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormValues>({
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgetPasswordFormValues) => {
    forgetPassword.mutate(data.email, {
      onSuccess: (response) => {
        if (response) {
          navigate(`/reset-password/${encodeURIComponent(data.email)}`);
        }
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
            Find Yourself
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={forgetPassword.isPending}
              >
                {forgetPassword.isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Continue"
                )}
              </Button>
              {forgetPassword.error && (
                <Alert severity="error">{forgetPassword.error.message}</Alert>
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
