import { spawn } from "child_process";
import logger from "./logger.js";

export function runCommandForJsonResponse(cmd, args) {
  logger.info(`Running Command: ${cmd} Args: ${args}`)
  const promise = new Promise((resolve, reject) => {
    const ls = spawn(cmd, args);

    let result = "";
    ls.stdout.on("data", (data) => {
      result += data.toString();
    });

    ls.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
      reject(new Error("stderr occured"));
    });

    ls.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`error code: ${code}`));
      } else {
        resolve(JSON.parse(result));
      }
    });
  });
  return promise;
}
