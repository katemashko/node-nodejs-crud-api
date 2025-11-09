import * as http from "node:http";
import { parseBody } from "./utils/parse-body";
import { HttpError } from "./http-error";
import { usersController } from "./users/users.controller";
import { endpointNotFound } from "./users/users.service";

export const server = http.createServer(async (req, res) => {
  try {
    try {
      req.body = (await parseBody(req)) as any;
    } catch (error) {
      throw new HttpError(400, "Invalid JSON");
    }

    if (req.url?.startsWith("/api/users")) {
      return await usersController(req, res);
    }

    endpointNotFound(req, res);
  } catch (error) {
    if (error instanceof HttpError) {
      res.statusCode = error.statusCode;
      res.end(JSON.stringify({ message: error.message }));
    } else {
      res.statusCode = 500;
      res.end("Internal server error");
    }
  }
});

declare module "http" {
  interface IncomingMessage {
    params?: { [key: string]: string };
    body?: { [key: string]: string };
  }
}
