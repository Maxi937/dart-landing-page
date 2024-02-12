// Hapi Boom does not send extra data to client but the API spec I want to follow requires a
// small reformat of the data. This Extension reformats the Boom object to include an overall status
// along with the normal Boom properties - all at top level.

// Client should be able to access the below through the response.data object.
// server raises these errors like a normal Boom -
// eg. Boom.badrequest("bad request, { any properties here will be visible to the client }")

export function boomResponseData(server) {
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (!response.isBoom) {
      return h.continue;
    }

    if (response.data) {
      response.data.statusCode = response.output.payload.statusCode;
      response.data.error = response.output.payload.error;
      response.data.success = false;
      response.output.payload = response.data;
    } else {
      response.data = response.output.payload;
      response.data.success = false;
    }

    return h.continue;
  });
}
