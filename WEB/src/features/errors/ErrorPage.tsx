import { useRouteError, Link as RouterLink } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  useTheme,
  Divider,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function ErrorPage() {
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
            border: `2px solid ${theme.palette.error.main}`,
            backgroundColor: "transparent",
          }}
        >
          <Box sx={{ marginBottom: 3 }}>
            <WarningIcon
              sx={{
                fontSize: "4rem",
                color: theme.palette.error.main,
              }}
            />
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", md: "2.5rem" },
              marginBottom: 2,
              color: theme.palette.text.primary,
            }}
          >
            Something Went Wrong
          </Typography>

          <Divider
            sx={{
              backgroundColor: theme.palette.error.main,
              height: 2,
              width: 60,
              margin: "1.5rem auto",
              opacity: 0.5,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: theme.palette.text.secondary,
              marginBottom: 4,
              minHeight: "3rem",
              lineHeight: 1.6,
            }}
          >
            {error?.statusText || error?.message || (
              <>
                An unexpected error occurred. <br />
                Please try again or return to the home page.
              </>
            )}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.primary.main,
                padding: "14px 48px",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: theme.palette.error.main,
                  opacity: 0.9,
                },
              }}
            >
              Return Home
            </Button>

            <Button
              onClick={() => window.location.reload()}
              variant="outlined"
              sx={{
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                padding: "14px 48px",
                fontSize: "1rem",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.secondary.main,
                },
              }}
            >
              Reload Page
            </Button>
          </Box>
        </Paper>

        {/* Support Info */}
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            marginTop: 2,
            textAlign: "center",
            maxWidth: 400,
          }}
        >
          If this problem persists, please contact support or try again later.
        </Typography>
      </Box>
    </Container>
  );
}
