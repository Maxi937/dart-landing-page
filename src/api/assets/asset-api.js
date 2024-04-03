import Boom, { boomify } from "@hapi/boom";
import path from "path";
import fs from "fs";

const assetApi = {
  getImages: {
    method: "GET",
    path: "/api/assets/images",
    auth: false,
    handler: async function (request, h) {
      try {
        const images = fs.readdirSync("public/gallery");

        const gallery = [];
        images.forEach((image) => gallery.push(`gallery/${image}`));
        return h.response(gallery);
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

export default assetApi;
