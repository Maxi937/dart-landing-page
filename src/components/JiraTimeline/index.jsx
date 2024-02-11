import Typography from "@mui/material/Typography";
import SprintCalender from "./SprintCalender";
import { Box } from "@mui/material";
import { jiraService } from "../../service/jiraService";
import { useQuery } from "react-query";

function JiraTimeline() {
	const { data, error, isLoading } = useQuery(
		"jiraTimeline",
		jiraService.getBoard
	);

	if (error) return <div>Request Failed</div>;
	if (isLoading) return <div>Loading...</div>;

	return (
		<Box>
			<Typography>{data.board.location.projectName}</Typography>
            <SprintCalender sprints={data.sprints}/>
		</Box>
	);
}

export default JiraTimeline;
