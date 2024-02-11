import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

function SprintHover({ sprint }) {
  const issues = sprint.issues.map((issue) => {
    console.log(issue);
    return <Typography>{issue.key}</Typography>;
  });

  return <Typography>{issues}</Typography>;
}

export default SprintHover;
