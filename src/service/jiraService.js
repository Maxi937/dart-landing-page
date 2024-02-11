import axios from "axios";
import { registerAxiosResponseHandler } from "../utils/service-utils.js";

registerAxiosResponseHandler(axios);


export const jiraService = {
	async getBoard() {
		const { data } = await axios.get("api/jira/dart")
		return data
	},
};
