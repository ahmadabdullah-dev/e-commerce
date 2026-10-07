import type { UpdateUserDto } from "../../lib/types/user"
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCurrentUser, useUpdateCurrentUser } from "../../lib/hooks/useUser";

export default function UpdateUser() {
  const { data: user, isLoading } = useCurrentUser();
  const update = useUpdateCurrentUser();
  const {register, handleSubmit, formState: { errors } } = useForm<UpdateUserDto>({
    values: user && {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? ""
    },
  });
 
  const onSubmit = (values: UpdateUserDto) => {
    update.mutate(
      {
        firstName: values.firstName?.trim() ?? "",
        lastName: values.lastName?.trim()  ?? "",
      },
    );
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="info" variant="outlined">
          Product not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Update User
      </Typography>

      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 4, border: 1, borderColor: "divider" }}
      >
        <Stack spacing={3}>
          <TextField
            label="First Name"
            fullWidth
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            {...register("firstName")}
          />

          <TextField
            label="LastName"
            fullWidth
            multiline
            minRows={3}
            {...register("lastName")}
          />

        

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={update.isPending}
          >
            {update.isPending ? "Saving changes" : "Save changes"}
          </Button>
          {update.isError && (
            <Alert severity="error">{update.error.message}</Alert>
          )}
          {update.isSuccess && (
            <Alert severity="success">
              {typeof update.data === "string"
                ? update.data
                : "User updated"}
            </Alert>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
