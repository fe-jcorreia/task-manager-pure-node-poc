import http from "node:http";
import { Database } from "./database.js";
const server = http.createServer((request, response) => {
  const database = new Database();

  if (request.method === "GET" && request.url === "/tasks") {
    const data = database.select()
    console.log(data)

    return response.writeHead(200).end();
  }
});

server.listen(3333);
