import type { UpdateCurrentUserNameDto } from "../../lib/types/user"
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
import { useCurrentUser, useUpdateCurrentUserName } from "../../lib/hooks/useUser";

export default function UpdateUserName() {
  const { data: user, isLoading } = useCurrentUser();
  const update = useUpdateCurrentUserName();
  const {register, handleSubmit, formState: { errors } } = useForm<UpdateCurrentUserNameDto>({
    values: user && {
      newUserName: user.userName ?? "",
    },
  });
 
  const onSubmit = (values: UpdateCurrentUserNameDto) => {
    update.mutate({
      newUserName: values.newUserName?.trim() ?? "",
    });
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
          User not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Update UserName
      </Typography>

      <Paper
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ p: 4, border: 1, borderColor: "divider" }}
      >
        <Stack spacing={3}>
          <TextField
            label="UserName"
            fullWidth
            error={!!errors.newUserName}
            helperText={errors.newUserName?.message}
            {...register("newUserName")}
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
