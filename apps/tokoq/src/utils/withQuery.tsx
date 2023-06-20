import React, { memo } from "react";
import { useRouter } from "next/router";

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

export const withQuery = <
  Query extends Record<string, string> = Record<string, string>,
  Props = any,
  PropsFromQuery extends Partial<Props> = Partial<Props>
>(
  Component: (props: Props) => any,
  mapQueryToProps: (query: Query) => PropsFromQuery,
  propsAreEqual?: PropsAreEqual<Props> | false
) => {
  const MemoizedComponent = memo(
    Component,
    !propsAreEqual ? undefined : propsAreEqual
  ) as unknown as (
    props: PropsFromQuery & Omit<Props, keyof PropsFromQuery>
  ) => any;
  function WithQuery(props: Omit<Props, keyof PropsFromQuery>) {
    const { query = {} } = useRouter();
    const cleanQuery = Object.keys(query).reduce<Query>(
      (oldCleanQuery, queryKey) => ({
        ...oldCleanQuery,
        [queryKey]: query[queryKey]?.toString() ?? "",
      }),
      {} as Query
    );
    const newProps = {
      ...mapQueryToProps(cleanQuery),
      ...props,
    };
    return <MemoizedComponent {...newProps} />;
  }
  WithQuery.displayName = `WithQuery`;
  return WithQuery;
};
