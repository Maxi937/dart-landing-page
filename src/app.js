import fs from "fs";
import { loadconfig } from "./utils/loadconfig.js";
import { start } from "./server/server.js";

loadconfig();
await start();



// setTimeout(async () => {
//   const d = await dartService.getRequestXmlForFilenet("qar", 49240758);
//   const tostr = ConvertXmlToString(d);
//   fs.writeFileSync("test.xml", tostr);
// }, 2000);
