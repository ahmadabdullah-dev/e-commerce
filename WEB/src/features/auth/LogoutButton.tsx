import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogout } from "../../lib/hooks/useAuth";

export default function LogoutButton() {
  const logoutAsync = useLogout();

  return (
    <Button
      onClick={() => logoutAsync.mutate()}
      disabled={logoutAsync.isPending}
      variant="outlined"
      startIcon={<LogoutIcon />}
      sx={{px:0}}
    >
      {logoutAsync.isPending ? "..." : ""}
    </Button>
  );
}
