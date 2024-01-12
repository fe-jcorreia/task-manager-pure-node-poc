export function extractUrlParams(path) {
  const regex = /:([a-zA-Z0-9-_]+)/g
  const pathWithParams = path.replaceAll(regex, "(?<$1>[a-z0-9-_]+)")

  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

  return pathRegex
}

