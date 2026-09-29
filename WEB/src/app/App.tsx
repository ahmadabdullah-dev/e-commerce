import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ height: { xs: 56, md: 64 } }} />
     <Header/>
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer/>
    </Box>
  );
}
