import * as http from "node:http";
import { v4 as uuidv4 } from "uuid";
import { isValidUUIDv4 } from "../validators";
import { HttpError } from "../http-error";
import users from "./users.repository";

// ******** get all users ********
async function getUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(users));
}

// ******** get user by id ********
async function getUserById(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const userId = req.params?.userId!;
  if (!isValidUUIDv4(userId)) {
    res.statusCode = 400;
    return res.end("Invalid JSON");
  }

  const user = users.find((item) => item.id === userId);
  if (user === undefined) {
    res.statusCode = 404;
    return res.end("User does not exist");
  }

  res.statusCode = 200;
  return res.end(JSON.stringify(user));
}

// ******** create new user ********
async function createNewUser(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const newUser = Object.assign(
    { id: uuidv4() },
    req.body as any as { username: string; age: number; hobbies: string[] }
  );
  if (!newUser.id || !newUser.username || !newUser.age || !newUser.hobbies) {
    res.statusCode = 400;
    return res.end("Missing required fields");
  }

  users.push(newUser);
  res.statusCode = 201;
  return res.end(JSON.stringify(newUser));
}

// ******** endpoint not found ********
function endpointNotFound(req: http.IncomingMessage, res: http.ServerResponse) {
  throw new HttpError(404, "Resource not found");
}

export { createNewUser, getUsers, getUserById, endpointNotFound };
