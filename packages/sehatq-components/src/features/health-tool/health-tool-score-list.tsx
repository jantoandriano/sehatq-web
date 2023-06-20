import React, { useState } from "react";

import {
  useGetHealthToolScoreList,
  InfiniteHealthToolScoreListCache,
} from "./health-tool-queries";
import { HealthToolScoreListDesktop } from "./health-tool-score-list-desktop";
import { HealthToolScoreListMobile } from "./health-tool-score-list-mobile";
import { HealthToolsFilter, HealthToolScores } from "./health-tools-model";

export type HealthToolScoreListProps = {
  isMobile: boolean;
  userId: string;
  healthToolSlug: string;
};

function selectHealtToolScoreList(cache: InfiniteHealthToolScoreListCache) {
  return cache.pages.reduce<HealthToolScores[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}
function selectHealthToolScoreListMeta(
  cache: InfiniteHealthToolScoreListCache
) {
  return cache.pages[cache.pages.length - 1].meta;
}

export function HealthToolScoreList({
  isMobile,
  userId,
  healthToolSlug,
}: HealthToolScoreListProps) {
  const [stateDateRange, setStateDateRange] = useState("");
  const {
    data: list,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetHealthToolScoreList(
    {
      page: "1",
      perPage: "10",
      userId: userId === "all" ? "" : userId,
      healthToolSlug,
      dateRange: stateDateRange,
    },
    { select: selectHealtToolScoreList }
  );

  const { data: meta } = useGetHealthToolScoreList(
    {
      page: "1",
      perPage: "10",
      userId: userId === "all" ? "" : userId,
      healthToolSlug,
      dateRange: stateDateRange,
    },
    { select: selectHealthToolScoreListMeta, keepPreviousData: true }
  );

  const dateRanges: HealthToolsFilter["dateRange"] = [
    {
      label: "Semua",
      value: "",
    },
    ...(meta?.filters.dateRange || []),
  ];

  const isMaxPage =
    meta?.pagination.total == 0 ||
    meta?.pagination.page == meta?.pagination.maxPage;

  const props = {
    healhToolScoreList: list,
    healthTool: meta?.healthTool,
    dateRanges: dateRanges,
    isLoadingDateRange: !meta,
    userId,
    stateDateRange,
    setStateDateRange,
    fetchNextPage,
    isFetchingNextPage,
    isMaxPage,
    pagination: meta?.pagination,
  };

  if (isMobile) {
    return <HealthToolScoreListMobile {...props} />;
  }
  return <HealthToolScoreListDesktop {...props} />;
}
