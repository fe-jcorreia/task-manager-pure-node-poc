import http from "node:http";
import { fullStreamRead } from "./middlewares/stream-reader.js";
import { routes } from "./routes.js";
import { buildRequestParams } from "./utils/build-request-params.js";

const server = http.createServer(async (request, response) => {
  await fullStreamRead(request, response);

  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url);
  });

  if (route) {
    buildRequestParams(request, response, route);
    console.log(request.query)

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(3333);
