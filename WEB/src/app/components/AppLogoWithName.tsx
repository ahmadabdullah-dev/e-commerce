import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";
import theme from "../../lib/theme";

export default function AppLogoWithName() {
  return (
    <Box
      component={RouterLink}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        textDecoration: "none",
        width: "fit-content",
        mx: 1,
      }}
    >
      <Box
        component="img"
        src="/public/app_logo.png"
        alt="Logo"
        sx={{ width: 30, height: 30, objectFit: "contain" }}
      />
      <Typography
        sx={{
          color: theme.palette.text.primary,
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          lineHeight: 1,
        }}
      >
      Abdullah Shop
      </Typography>
    </Box>
  );
}
