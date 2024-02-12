import * as dotenv from "dotenv";
import logger from "./logger.js";

function successMessage(environment) {
  logger.info(`${environment} config Loaded`);
}

// Load Config File
export function loadconfig() {
  const enviroment = process.env.NODE_ENV;

  switch (enviroment) {
    case "development":
      successMessage(enviroment)
      dotenv.config({ path: "./.env" });
      break
    case "production":
      console.log("prod loaded")
      successMessage(enviroment)
      dotenv.config({ path: "./.env" });
      break
    default:
      logger.error("Config error");
      process.exit(1);
  }
}


