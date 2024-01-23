import AppBar from "@mui/material/AppBar";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <CameraIcon sx={{ mr: 3 }} />
        <Typography variant="h6" color="inherit" noWrap>
          Photo Labelizer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
