import Typography from "@mui/material/Typography";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';

function JiraStatusIcon({status}) {

  if (String(status).toLowerCase() === "done") {
    return <CheckCircleIcon/>
  }
  else {
    return <CircleIcon/>
  }

}

export default JiraStatusIcon;
