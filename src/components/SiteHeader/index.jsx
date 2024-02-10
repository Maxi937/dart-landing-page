import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";


const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  let menuOptions = [
    { label: "Home", path: "/" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  return (
    <>
      <AppBar sx={{ backgroundColor: "black"}} position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            Dart
          </Typography>
          <>
            {menuOptions.map((opt) => (
              <Button key={opt.label} color="inherit" onClick={() => handleMenuSelect(opt.path)}>
                {opt.label}
              </Button>
            ))}
            {/* <LoginLogoutButton /> */}
          </>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;