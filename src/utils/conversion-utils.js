import { TYPES as Types } from "tedious";
import xml2js from "xml2js";
import xmlJs from "xml-js";
import { promisify } from "util";

export async function convertStreamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      if (typeof data === "string") {
        // Convert string to Buffer assuming UTF-8 encoding
        chunks.push(Buffer.from(data, "utf-8"));
      } else if (data instanceof Buffer) {
        chunks.push(data);
      } else {
        // Convert other data types to JSON and then to a Buffer
        const jsonData = JSON.stringify(data);
        chunks.push(Buffer.from(jsonData, "utf-8"));
      }
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

export function ConvertStringToTediousType(param) {
  let result = {};

  Object.entries(Types).forEach(([key, value]) => {
    if (param === key) {
      result = value;
    }
  });

  if (result) {
    return result;
  }
  throw new Error(`${param} is not a valid SQL parameter Type`);
}

export async function ConvertStringToXml(xmlString) {
  const result = await promisify(xml2js.parseString)(xmlString);
  return result;
}

export async function ConvertDocGenXmlRequestToDataXml(xmlString) {
  const xml = await ConvertStringToXml(xmlString);

  return new Promise((resolve, reject) => {
    xml2js.parseString(xml.Event.Values[0]["dgp-request"][0].data[0], (err, result) => (err ? reject(err) : resolve(result)));
  });
}

export function ConvertXmlToString(xmlobject) {
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(xmlobject);
  return xml.toString();
}

// // Check param is tediousType
// export function checkParamIsTediousType(param) {
//   for (const t in Types) {
//     if (Types[t] === param) {
//       return param;
//     }
//   }
//   throw new Error(`${param} is not a valid SQL parameter Type`);
// }
