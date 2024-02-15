import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Paper } from "@mui/material";
import JiraStatusIcon from "./JiraStatusIcon";
import JiraIssueIcon from "./JiraIssueIcon";

const styles = {
  container: {
    color: "white",
    display: "flex",
    backgroundColor: "#242424",
    margin: "5px",
    padding: "10px",
    gap: "20px"
  },
  innerContainer: {},
  key: {
    fontWeight: "800",
  },
  icon: {
    alignSelf: "center"

  },
  status: {
    alignSelf: "center",
    flexGrow: "1",
    textAlign: "right"

  }
};

function JiraIssue({ issue }) {
  return (
    <Paper elevation={3} sx={styles.container}>
      <Box sx={styles.icon}>
        <JiraIssueIcon issue={issue} />
      </Box>
      <Box>
        <Typography sx={styles.key}>{issue.key}</Typography>
        <Typography>{issue.fields.summary}</Typography>
      </Box>
      <Box sx={styles.status}>
        <JiraStatusIcon status={issue.fields.status.name}/>
      </Box>
    </Paper>
  );
}

export default JiraIssue;
