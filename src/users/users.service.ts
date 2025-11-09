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
    throw new HttpError(400, "Invalid JSON");
  }

  const user = users.find((item) => {
    return item.id === userId;
  });
  if (user === undefined) {
    throw new HttpError(404, "User does not exist");
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
    throw new HttpError(400, "Missing required fields");
  }

  users.push(newUser);
  res.statusCode = 201;
  return res.end(JSON.stringify(newUser));
}

// ******** edit user by id ********
async function editUserById(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const userId = req.params?.userId!;
  if (!isValidUUIDv4(userId)) {
    throw new HttpError(400, "Invalid JSON");
  }

  const userToUpdate = users.find((item) => {
    return item.id === userId;
  });
  if (userToUpdate === undefined) {
    throw new HttpError(404, "User does not exist");
  }

  const updatedUser = Object.assign(
    userToUpdate,
    req.body as any as {
      username: string;
      age: number;
      hobbies: string[];
    }
  );

  res.statusCode = 200;
  return res.end(JSON.stringify(updatedUser));
}

// ******** delete user by id ********
async function deleteUserById(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  const userId = req.params?.userId!;
  if (!isValidUUIDv4(userId)) {
    throw new HttpError(400, "Invalid JSON");
  }

  const userIndexToDelete = users.findIndex((item) => {
    return item.id === userId;
  });
  if (userIndexToDelete === undefined) {
    throw new HttpError(404, "User does not exist");
  }

  if (userIndexToDelete !== 1) {
    users.splice(userIndexToDelete, 1);
    res.statusCode = 204;
    return res.end();
  }
}

// ******** endpoint not found ********
function endpointNotFound(req: http.IncomingMessage, res: http.ServerResponse) {
  throw new HttpError(404, "Resource not found");
}

export {
  createNewUser,
  deleteUserById,
  getUsers,
  getUserById,
  editUserById,
  endpointNotFound,
};
