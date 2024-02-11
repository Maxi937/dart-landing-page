import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { menuOptions } from "./menuOptions";
import { useState } from "react";

const styles = {
	title: {
		fontWeight: "900",
		flexGrow: 1,
	},
	selectedOption: {
		fontWeight: "900",
		background: "-webkit-linear-gradient(45deg, #2d98fc, #9dcefc)",
		"-webkit-background-clip": "text",
		"-webkit-text-fill-color": "transparent",
	},
	notSelectedOption: {
    transition: "background-color 0.2s ease",
		"&:hover": {
			backgroundColor: "black",
		},
	},
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
	const [selected, setSelected] = useState("/");
	const navigate = useNavigate();

	const handleMenuSelect = (pageURL) => {
		setSelected(pageURL);
		navigate(pageURL);
	};

	function mapMenuOptions() {
		return menuOptions.map((menu) => {
			console.log(selected);
			if (menu.path === selected) {
				return (
					<Button
						sx={styles.selectedOption}
						color="inherit"
						key={menu.label}
						onClick={() => handleMenuSelect(menu.path)}
					>
						{menu.label}
					</Button>
				);
			} else {
				return (
					<Button
            sx={styles.notSelectedOption}
						key={menu.label}
						color="inherit"
						onClick={() => handleMenuSelect(menu.path)}
					>
						{menu.label}
					</Button>
				);
			}
		});
	}

	// const handleMenu = (event) => {
	//   setAnchorEl(event.currentTarget);
	// };

	return (
		<>
			<AppBar
				sx={{ backgroundColor: "transparent" }}
				position="fixed"
				elevation={0}
				color="primary"
			>
				<Toolbar>
					<Typography sx={styles.title} variant="h4"></Typography>
					<>{mapMenuOptions()}</>
				</Toolbar>
			</AppBar>
			<Offset />
		</>
	);
};

export default SiteHeader;
