/* eslint-disable no-useless-escape */
import { URLS } from "@sehatq/constants";
import { match } from "path-to-regexp";
import { urlSearchParamsToQuery } from "./url-search-params-to-query";

export function parseRealURL(
  realUrl: string,
  pathname: typeof URLS[keyof typeof URLS]
) {
  let patern = pathname;
  patern.match(/\/\[\[([^\[\]]+)\]\]/g)?.forEach((result) => {
    const key = result.slice(3, result.length - 2);
    patern = key.includes("...")
      ? patern.replace(result, `/:${key.replace("...", "")}*`)
      : patern.replace(result, `/:${key}+`);
  });
  patern.match(/\/\[([^\[\]]+)\]/g)?.forEach((result) => {
    const key = result.slice(2, result.length - 1);
    patern = patern.replace(result, `/:${key}`);
  });
  const pathnameMatcher = match(patern);
  const url = new URL(realUrl, "http://www.example.com");
  const matchResult = pathnameMatcher(url.pathname);
  if (matchResult) {
    matchResult.params;
    return {
      pathname,
      query: {
        ...matchResult.params,
        ...urlSearchParamsToQuery(new URLSearchParams(url.search)),
      },
    };
  } else {
    null;
  }
}
