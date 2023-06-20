import {
  UseInfiniteQueryOptions as UseInfiniteQueryOptionsRQ,
  InfiniteData,
} from "react-query";

export interface UseInfiniteQueryOptions<
  FetcherReturn = unknown,
  FetchError = unknown,
  SelectReturn = unknown
> extends Omit<
    UseInfiniteQueryOptionsRQ<FetcherReturn, FetchError, SelectReturn>,
    "select"
  > {
  select?: (data: InfiniteData<FetcherReturn>) => SelectReturn;
}
