import { Query } from "@sehatq/types";

export function urlSearchParamsToQuery(urlSearchParams: URLSearchParams) {
  const query: Query = {};
  urlSearchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
}
