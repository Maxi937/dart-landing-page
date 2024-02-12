import Boom, { boomify } from "@hapi/boom";
import path from "path";
import logger from "../../utils/logger.js";
import { jiraService } from "../../services/jira-service.js";

const jiraApi = {
  getBoard: {
    method: "GET",
    path: "/api/jira/{name}",
    auth: false,
    handler: async function (request, h) {
      try {
        const boards = await jiraService.getBoards();
        const result = {};

        await Promise.all(
          boards.map(async (board) => {
            if (String(board.location.projectName).toLowerCase() === request.params.name) {
              result.board = board;

              const sprintDetails = [];
              const sprints = await jiraService.getSprintsByBoardId(board.id);

              await Promise.all(
                sprints.map(async (sprint) => {
                  sprint.issues = await jiraService.getIssuesBySprintId(sprint.id);
                  sprintDetails.push(sprint);
                })
              );

              sprintDetails.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

              result.sprints = sprintDetails;
            }
          })
        );
        return h.response(result);
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable();
      }
    },
    tags: ["api"],
    description: "Returns all Users",
    notes: "Returns 'status: success' if the request succeeds, even if there are no users",
    // response: { schema: ApiResponseSchema },
  },
};

export default jiraApi;
