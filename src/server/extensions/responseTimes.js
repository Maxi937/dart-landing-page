import os from "os";
import logger from "../../utils/logger.js";

// Extend Server to get add Response Times to headers & log Requests
export function responseTimes(server) {
  server.ext("onRequest", (request, h) => {
    request.headers["x-req-start"] = new Date().getTime();
    return h.continue;
  });

  server.ext("onPreResponse", (request, h) => {
    const start = parseInt(request.headers["x-req-start"], 10);
    const end = new Date().getTime();
    if (!request.response.isBoom) {
      request.response
        .header("x-req-start", start)
        .header("x-res-end", end)
        .header("x-response-time", end - start)
        .header("Server", os.hostname());
      logger.http(null, { request });
    }
    return h.continue;
  });
}
