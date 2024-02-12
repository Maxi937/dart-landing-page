import fs from "fs";

export function writeToLocalFile(filename, string) {
  fs.writeFileSync("tmp/tmp.xml", string);
}

export function writeToFile(path, data) {
  fs.writeFileSync(path, data);
}

export function writeToTempFile(filename, data) {
  if (!fs.existsSync("temp")) {
    fs.mkdir("temp");
  }
  const path = `temp/${filename}`;
  fs.writeFileSync(path, data);
}

export function readFile(path, encoding) {
  return fs.readFileSync(path, { encoding: encoding });
}
