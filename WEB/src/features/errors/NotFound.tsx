import { useRouteError, Link as RouterLink } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
} from "@mui/material";

export default function NotFound() {
  const error = useRouteError() as { message?: string; statusText?: string };
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          gap: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            padding: 6,
            textAlign: "center",
            border: `2px solid ${theme.palette.secondary.main}`,
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "5rem" },
              fontWeight: 900,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 2,
            }}
          >
            404
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              marginBottom: 2,
              color: theme.palette.text.primary,
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
              marginBottom: 4,
              minHeight: "2rem",
            }}
          >
            {error?.statusText ||
              error?.message ||
              "The page you're looking for doesn't exist."}
          </Typography>

          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              padding: "14px 48px",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                opacity: 0.9,
              },
            }}
          >
            Return Home
          </Button>
        </Paper>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                width: 8,
                height: 8,
                backgroundColor: theme.palette.secondary.main,
                opacity: 0.5 - item * 0.1,
              }}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
