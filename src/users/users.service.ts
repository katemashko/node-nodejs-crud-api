import http from "node:http";
import { v4 as uuidv4 } from "uuid";
import { isValidUUIDv4 } from "../validators";
import { HttpError } from "../http-error";
import users from "./users.repository";

async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(users));
}

export { getUsers };
