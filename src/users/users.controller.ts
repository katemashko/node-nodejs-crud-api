import * as http from "node:http";
import * as usersService from "./users.service";

async function usersController(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  if (req.method === "GET" && req.url === "/api/users") {
    return await usersService.getUsers(req, res);
  }

  if (req.method === "GET" && req.url?.startsWith("/api/users/")) {
    const userId = req.url.split("/")[3];
    req.params = { userId };
    return await usersService.getUserById(req, res);
  }

  if (req.method === "POST" && req.url === "/api/users/") {
    return await usersService.createNewUser(req, res);
  }
}

export { usersController };
