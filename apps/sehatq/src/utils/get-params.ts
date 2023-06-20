import { MatchFunction } from "path-to-regexp";

export function getParams<Params extends object = object>(
  pathname: string,
  pathnameMatcher: MatchFunction<Params>
) {
  const matchResult = pathnameMatcher(pathname);
  if (matchResult) {
    return matchResult.params;
  }
}
