import * as http from "node:http";
import * as usersService from "./users.service";

async function usersController(
  req: http.IncomingMessage,
  res: http.ServerResponse
) {
  if (req.method === "GET" && req.url === "/api/users") {
    return await usersService.getUsers(req, res);
  }
}

export { usersController };
