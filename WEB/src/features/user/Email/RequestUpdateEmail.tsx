import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { useRequestUpdateCurrentEmail } from "../../../lib/hooks/useUser";

type Props = {
  onCodeSent: (email: string) => void;
};

type EmailForm = { newEmail: string };

export default function RequestUpdateEmail({ onCodeSent }: Props) {
  const requestUpdate = useRequestUpdateCurrentEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({ defaultValues: { newEmail: "" } });

  const onSubmit = (data: EmailForm) => {
    requestUpdate.mutate(data, {
      onSuccess: () => onCodeSent(data.newEmail),
    });
  };

  return (
    <>
      <Stack spacing={1} sx={{ mb: 4, alignItems: "center" }}>
        <EmailIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Change Your Email
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Enter your new email address. We'll send you a confirmation code.
        </Typography>
      </Stack>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <TextField
            label="New Email"
            type="email"
            fullWidth
            {...register("newEmail", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
            error={!!errors.newEmail}
            helperText={errors.newEmail?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={requestUpdate.isPending}
          >
            {requestUpdate.isPending ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Send Code"
            )}
          </Button>

          {requestUpdate.error && (
            <Alert severity="error" variant="outlined">
              {requestUpdate.error.message}
            </Alert>
          )}
        </Stack>
      </Box>
    </>
  );
}
