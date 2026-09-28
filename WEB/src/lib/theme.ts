import { createTheme } from "@mui/material/styles";

export const theme = () =>
  createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#000000",
        paper: "#0d0d0d",
      },
      primary: {
        main: "#ffffff",
        contrastText: "#000000",
      },
      secondary: {
        main: "#005288",
      },
      text: {
        primary: "#ffffff",
        secondary: "#777777",
      },
      divider: "rgba(255,255,255,0.10)",
      error: { main: "#ff3b30" },
      success: { main: "#00d26a" },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      h1: { fontWeight: 700, fontSize: "3.5rem", textTransform: "uppercase" },
      h2: { fontWeight: 700, fontSize: "2.5rem", textTransform: "uppercase" },
      h3: { fontWeight: 600, fontSize: "1.75rem", textTransform: "uppercase" },
      button: { textTransform: "uppercase", fontWeight: 600 },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 0, padding: "12px 32px", fontWeight: 600 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none", borderRadius: 0 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { border: "1px solid rgba(255,255,255,0.10)", borderRadius: 0 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 999 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined" },
      },
    },
  });

export default theme();