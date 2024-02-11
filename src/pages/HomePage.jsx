import StyledHeader from "../components/StyledHeader";
import JiraTimeline from "../components/JiraTimeline";
import { Box } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", padding: "150px" }}>
        <StyledHeader text="In Development" />
      </Box>
      <JiraTimeline />
    </>
  );
};

export default HomePage;
