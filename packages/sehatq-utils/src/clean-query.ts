import { Query } from "@sehatq/types";

export function cleanQuery(query: Query) {
  return Object.keys(query).reduce(
    (cleanedQuery, queryKey) =>
      query[queryKey]
        ? { ...cleanedQuery, [queryKey]: query[queryKey] }
        : { ...cleanedQuery },
    {} as Query
  );
}
