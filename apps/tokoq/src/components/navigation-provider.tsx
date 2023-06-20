import React, { ReactElement } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { NavigationProvider, NavigateProps, cleanQuery } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";

function navigate(
  name: NavigateProps["name"],
  query?: NavigateProps["query"],
  options?: NavigateProps["options"]
) {
  const { pathname: currentPathname, query: currentQuery } = Router;
  const newQuery =
    currentPathname === URLS[name] ? { ...currentQuery, ...query } : query;
  if (options && options.replace) {
    Router.replace(
      {
        pathname: URLS[name],
        query: newQuery ? cleanQuery(newQuery) : undefined,
      },
      undefined,
      options
    );
    return;
  }
  Router.push(
    {
      pathname: URLS[name],
      query: newQuery ? cleanQuery(newQuery) : undefined,
    },
    undefined,
    options
  );
}

function goBack() {
  Router.back();
}

function Navigate(props: NavigateProps) {
  const { children, name, query, ...restProps } = props;
  const { pathname: currentPathname, query: currentQuery } = useRouter();
  const newQuery =
    currentPathname === URLS[name] ? { ...currentQuery, ...query } : query;
  return (
    <Link
      href={{
        pathname: URLS[name],
        query: newQuery ? cleanQuery(newQuery) : undefined,
      }}
      {...restProps}
      passHref
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

export function TokoQNavigationProvider({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <NavigationProvider value={navigationValue}>{children}</NavigationProvider>
  );
}
