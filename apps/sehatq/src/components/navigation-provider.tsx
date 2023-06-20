import React, { ReactElement, cloneElement, useState, useEffect } from "react";
import NextJSRouter, { useRouter } from "next/router";
import Link from "next/link";
import {
  NavigationProvider,
  NavigateProps,
  cleanQuery,
  isAbsoluteUrl,
  createRealURL,
  parseRealURL,
  getClientIdFromBrowser,
} from "@sehatq/utils";
import { ENV, URLS } from "@sehatq/constants";
import { Query } from "@sehatq/types";
import { useFillGuestBook } from "@utils";

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

  const clientId = getClientIdFromBrowser();
  if (clientId === "ios" || clientId === "android") {
    if (options?.replace) {
      window.location.replace(createRealURL(targetPathName, newQuery));
      return;
    }
    window.location.href = createRealURL(targetPathName, newQuery);
    return;
  }
  const as = alias ? getAs(asPath, URLS[alias.name], alias.query) : undefined;
  if (options?.replace) {
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

function createAbsoluteUrl(path: string | undefined) {
  if (!path) return "";
  if (isAbsoluteUrl(path)) return path;
  return `${ENV.SEHATQ_DOMAIN}${path}`;
}

function Navigate(props: NavigateProps) {
  const [stateClientId, setStateClientId] = useState<string>();
  const { children, name, query, options } = props;
  const { alias, ...otherOptions } = options ?? {};
  const { fillGuestBook } = useFillGuestBook();

  useEffect(() => {
    setStateClientId(getClientIdFromBrowser());
  }, []);

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

  const href = createRealURL(targetPathName, newQuery);
  if (stateClientId === "ios" || stateClientId === "android") {
    return cloneElement(children, {
      href,
    });
  }
  const as = alias ? getAs(asPath, URLS[alias.name], alias.query) : undefined;

  return (
    <Link
      href={getNextLinkHref(targetPathName, newQuery)}
      as={as}
      passHref
      {...otherOptions}
    >
      {cloneElement(children, {
        onClick: () =>
          fillGuestBook(createAbsoluteUrl(as) || createAbsoluteUrl(href)),
      })}
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
