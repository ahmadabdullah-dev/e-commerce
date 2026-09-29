import { Box, Divider, Typography } from "@mui/material";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Divider sx={{ borderWidth:2, borderColor: "primary.main"}} />
      <Typography variant="body1" color="text.secondary" sx={{mt:2}}>
        © {new Date().getFullYear()} Abdullah Shop. All rights reserved.
      </Typography>
    </Box>
  );
}
