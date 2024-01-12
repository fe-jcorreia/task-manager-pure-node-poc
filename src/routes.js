import { extractUrlParams } from "./utils/extract-url-params.js";
import { Database } from "../database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: extractUrlParams("/tasks"),
    handler: (request, response) => {
      const data = database.select("tasks");

      return response.writeHead(200).end(JSON.stringify(data));
    },
  },
  {
    method: "POST",
    path: extractUrlParams("/tasks"),
    handler: (request, response) => {
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
    },
  },
  {
    method: "PUT",
    path: extractUrlParams("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;
      const { title, description } = request.body;

      database.update("tasks", id, { title, description });

      return response.writeHead(200).end();
    },
  },
  {
    method: "DELETE",
    path: extractUrlParams("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      database.delete("tasks", id);

      return response.writeHead(200).end();
    },
  },
  {
    method: "PATCH",
    path: extractUrlParams("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;

      database.update("tasks", id, { completedAt: new Date() });

      return response.writeHead(200).end();
    },
  },
];
