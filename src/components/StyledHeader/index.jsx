import Typography from "@mui/material/Typography";

const style = {
    fontWeight: "900",
    background: "-webkit-linear-gradient(45deg, #2d98fc, #9dcefc)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent"
};

function StyledHeader({text}) {
    return (
        <Typography sx={style} variant="h3">
            {text}
        </Typography>
	);

}

export default StyledHeader;