import { Fetch } from "@sehatq/utils";
import { Query } from "@sehatq/types";

export interface FetcherArgs<LocalQuery extends Query = Query> {
  fetch: Fetch;
  query: LocalQuery;
}
