import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Cookie from "@hapi/cookie";
import jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import Joi from "joi";
import path from "path";
import { fileURLToPath } from "url";
import logger from "../utils/logger.js";
import { responseTimes } from "./extensions/responseTimes.js";
import { requestInfo } from "./extensions/requestInfo.js";
import { registerRoutes } from "./extensions/registerRoutes.js";
import { boomResponseData } from "./extensions/boomResponseData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function setupServer() {
  const swaggerOptions = {
    info: {
      title: "Dart Server",
      version: "0.1",
    },
  };

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
  });

  // Plugins
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);

  // Server Extensions
  responseTimes(server);
  requestInfo(server);
  boomResponseData(server);

  const react = {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: { path: "./public/dist" },
    },
    options: { auth: false },
  };
  server.route(react);

  const gallery = {
    method: "GET",
    path: "/gallery/{param*}",
    handler: {
      directory: { path: "./public/gallery" },
    },
    options: { auth: false },
  };
  server.route(gallery);

  // This adds routes from each feature with a default export
  try {
    server.route(await registerRoutes());
  } catch (err) {
    logger.error(`Unable to register routes: ${err}`);
    process.exit();
  }

  process.on("unhandledRejection", (err) => {
    logger.error(err.message);
    process.exit(1);
  });
  return server;
}

export async function start() {
  const server = await setupServer();
  server.start();
  logger.info(`Server running on <${server.info.uri}>`);
  logger.info(`Server started: ${new Date()}`);
  return server;
}
