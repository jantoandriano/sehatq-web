import React, { ReactElement } from "react";
import NextJSRouter, { useRouter } from "next/router";
import Link from "next/link";
import {
  NavigationProvider,
  NavigateProps,
  cleanQuery,
  isAbsoluteUrl,
  createRealURL,
  parseRealURL,
} from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import { Query } from "@sehatq/types";

function getNextLinkHref(pathname: string, query?: Query) {
  let newQuery = query;
  let newPathname = pathname;
  if (isAbsoluteUrl(newPathname)) {
    // eslint-disable-next-line no-useless-escape
    newPathname.match(/\[([^\[\]]+)\]/g)?.forEach((result) => {
      const key = result.slice(1, result.length - 1);
      const value = newQuery?.[key];
      if (value) {
        newPathname = newPathname.replace(result, value.toString());
        newQuery = {
          ...newQuery,
          [key]: null,
        };
      }
    });
  }

  return newQuery
    ? {
        pathname: newPathname,
        query: cleanQuery(newQuery),
      }
    : newPathname;
}

function getAs(url: string, pathname: string, query?: NavigateProps["query"]) {
  let as;
  const parsedRealURL = parseRealURL(url, pathname);
  if (parsedRealURL) {
    as = createRealURL(
      pathname,
      typeof query === "function" ? query(parsedRealURL.query) : query
    );
  } else {
    as = createRealURL(pathname, typeof query === "function" ? query() : query);
  }
  return as;
}

function navigate(
  name: NavigateProps["name"],
  query?: NavigateProps["query"],
  options?: NavigateProps["options"]
) {
  const { alias, ...otherOptions } = options ?? {};
  const targetPathName = Object.keys(URLS).includes(name as string)
    ? URLS[name as keyof typeof URLS]
    : (name as string);
  const {
    pathname: currentPathname,
    query: currentQuery,
    asPath,
  } = NextJSRouter;

  const newQuery =
    typeof query === "function"
      ? currentPathname === targetPathName
        ? query(currentQuery)
        : query()
      : query;

  const as = alias ? getAs(asPath, URLS[alias.name], alias.query) : undefined;

  if (options && options.replace) {
    NextJSRouter.replace(
      getNextLinkHref(targetPathName, newQuery),
      as,
      otherOptions
    );
    return;
  }
  NextJSRouter.push(
    getNextLinkHref(targetPathName, newQuery),
    as,
    otherOptions
  );
}

function goBack() {
  NextJSRouter.back();
}

function Navigate(props: NavigateProps) {
  const { children, name, query, options } = props;
  const { alias, ...otherOptions } = options ?? {};
  const targetPathName = Object.keys(URLS).includes(name as string)
    ? URLS[name as keyof typeof URLS]
    : (name as string);
  const {
    pathname: currentPathname,
    query: currentQuery,
    asPath,
  } = useRouter();

  const newQuery =
    typeof query === "function"
      ? currentPathname === targetPathName
        ? query(currentQuery)
        : query()
      : query;

  const as = alias ? getAs(asPath, URLS[alias.name], alias.query) : undefined;

  return (
    <Link
      href={getNextLinkHref(targetPathName, newQuery)}
      as={as}
      passHref
      {...otherOptions}
    >
      {children}
    </Link>
  );
}

const navigationValue = {
  goBack,
  navigate,
  Navigate,
};

export function SehatQNavigationProvider({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <NavigationProvider value={navigationValue}>{children}</NavigationProvider>
  );
}
