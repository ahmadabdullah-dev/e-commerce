import { useState } from "react";
import { Box, Container, Paper } from "@mui/material";
import RequestUpdateEmail from "./RequestUpdateEmail";
import ConfirmNewEmail from "./ConfirmNewEmail"

export default function UpdateEmail() {
  const [sentTo, setSentTo] = useState<string | null>(null);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          sx={{
            p: { xs: 3, sm: 5 },
            width: "100%",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          {sentTo === null ? (
            <RequestUpdateEmail onCodeSent={setSentTo} />
          ) : (
            <ConfirmNewEmail
              sentTo={sentTo}
              onChangeEmail={() => setSentTo(null)}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
}
