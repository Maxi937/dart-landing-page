import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import JiraIssue from "../JiraIssue";

function SprintHover({ sprint }) {
  const issues = sprint.issues.map((issue) => {
    return <JiraIssue key={issue.key} issue={issue}/>;
  });

  return <Box sx={{backgorundColor: "black", margin: "10px"}}>{issues}</Box>;
}

export default SprintHover;
