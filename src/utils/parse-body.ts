import * as http from "node:http";

function parseBody(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    if (req.headers["content-type"] === "application/json") {
      let body = "";

      req.on("data", (chunk) => (body += chunk.toString()));
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }
  });
}

export { parseBody };
