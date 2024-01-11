import http from "node:http";
import { Database } from "../database.js";
import { streamReader } from "./middlewares/stream-reader.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (request, response) => {
  await fullStreamRead(request, response);

  if (request.method === "GET" && request.url === "/tasks") {
    const data = database.select("tasks");

    return response.writeHead(200).end(JSON.stringify(data));
  }

  if (request.method === "POST" && request.url === "/tasks") {
    const { title, description } = request.body;

    database.insert(
      "tasks",
      Object.assign({
        id: randomUUID(),
        title,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        completedAt: null,
      })
    );

    return response.writeHead(204).end();
  }
});

server.listen(3333);
