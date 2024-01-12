import { extractQueryParams } from "./extract-query-params.js";

export function buildRequestParams(request, response, route) {
  const routeParams = request.url.match(route.path);

  request.params = Object.assign({ ...routeParams.groups });
  request.query = routeParams.groups.query
    ? extractQueryParams(routeParams.groups.query)
    : {};
}
