import { extractUrlParams } from "./utils/extract-url-params.js";
import { Database } from "../database.js";
import { randomUUID } from "node:crypto";
import { verifyInput } from "./middlewares/verify-input.js";
import { errorMapper } from "./app-error.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: extractUrlParams("/tasks"),
    handler: (request, response) => {
      const filters = request.query;
      const data = database.select("tasks", filters);

      return response.writeHead(200).end(JSON.stringify(data));
    },
  },
  {
    method: "POST",
    path: extractUrlParams("/tasks"),
    handler: (request, response) => {
      try {
        verifyInput(request, response);
      } catch (error) {
        return response
          .writeHead(error.code)
          .end(JSON.stringify(errorMapper(error)));
      }
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
      try {
        verifyInput(request, response);
      } catch (error) {
        return response
          .writeHead(error.code)
          .end(JSON.stringify(errorMapper(error)));
      }
      const { id } = request.params;
      const { title, description } = request.body;

      try {
        database.update("tasks", id, { title, description });
      } catch (error) {
        return response
          .writeHead(error.code)
          .end(JSON.stringify(errorMapper(error)));
      }

      return response.writeHead(200).end();
    },
  },
  {
    method: "DELETE",
    path: extractUrlParams("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      try {
        database.delete("tasks", id);
      } catch (error) {
        return response
          .writeHead(error.code)
          .end(JSON.stringify(errorMapper(error)));
      }

      return response.writeHead(200).end();
    },
  },
  {
    method: "PATCH",
    path: extractUrlParams("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;

      try {
        database.update("tasks", id, { completedAt: new Date() });
      } catch (error) {
        return response
          .writeHead(error.code)
          .end(JSON.stringify(errorMapper(error)));
      }

      return response.writeHead(200).end();
    },
  },
];
