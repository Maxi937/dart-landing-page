import { Box } from "@mui/material";

function JiraIssueIcon({ issue }) {
  const icon = issue.fields.issuetype.iconUrl;
  return <img src={icon}></img>;
}

export default JiraIssueIcon;
