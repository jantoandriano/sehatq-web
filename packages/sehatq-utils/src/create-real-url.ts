/* eslint-disable no-useless-escape */
import { Query } from "@sehatq/types";
import { URLS } from "@sehatq/constants";
import { queryToString } from "./query-to-string";
import { cleanQuery } from "./clean-query";

export function createRealURL(
  pathname: typeof URLS[keyof typeof URLS],
  query?: Query
) {
  let newQuery = query;
  let newPathname = pathname;
  newPathname.match(/\/\[\[([^\[\]]+)\]\]/g)?.forEach((result) => {
    const key = result.slice(3, result.length - 2);
    const cleanedKey = key.replace("...", "");
    const value = newQuery?.[cleanedKey];
    if (value) {
      newPathname = newPathname.replace(
        result,
        `/${
          typeof value === "number" || typeof value === "string"
            ? value.toString()
            : value.join("/")
        }`
      );
    } else if (!value && key.includes("...")) {
      newPathname = newPathname.replace(result, "");
    }
    newQuery = {
      ...newQuery,
      [cleanedKey]: null,
    };
  });
  newPathname.match(/\/\[([^\[\]]+)\]/g)?.forEach((result) => {
    const key = result.slice(2, result.length - 1);
    const value = newQuery?.[key];
    if (value) {
      newPathname = newPathname.replace(result, `/${value.toString()}`);
      newQuery = {
        ...newQuery,
        [key]: null,
      };
    }
  });
  const cleanedQuery = newQuery ? cleanQuery(newQuery) : null;
  return `${newPathname}${
    cleanedQuery && Object.keys(cleanedQuery).length > 0
      ? queryToString(cleanedQuery)
      : ""
  }`;
}
