import { Query } from "@sehatq/types";

export function queryToString(query: Query) {
  return (
    "?" +
    Object.keys(query)
      .map((queryKey) =>
        query[queryKey] ? `${queryKey}=${query[queryKey]}` : null
      )
      .filter(Boolean)
      .join("&")
  );
}
