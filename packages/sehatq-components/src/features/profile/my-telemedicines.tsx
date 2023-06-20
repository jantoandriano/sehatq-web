import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import {
  useGetInfiniteMyTelemedicines,
  InfiniteMyTelemedicineCache,
} from "./my-telemedicine-queries";
import { MyTelemedicine } from "./my-telemedicine-model";
import { MyTelemedicinesDesktop } from "./my-telemedicines-desktop";
import { MyTelemedicinesMobile } from "./my-telemedicines-mobile";

function selectMyTelemedicines(myTelemedicines: InfiniteMyTelemedicineCache) {
  return myTelemedicines.pages.reduce<MyTelemedicine[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

function selectMyTelemedicinesPagination(
  myTelemedicines: InfiniteMyTelemedicineCache
) {
  return myTelemedicines.pages[myTelemedicines.pages.length - 1].pagination;
}

export interface MyTelemedicinesProps {
  isMobile?: boolean;
  userId?: string;
}

export function MyTelemedicines(props: MyTelemedicinesProps) {
  const { isMobile = false, userId } = props;
  const { ref: refInView, inView } = useInView();

  const myTelemedicinesQuery = {
    userId: userId || "",
    perPage: isMobile ? "10" : "5",
    page: "1",
  };

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: myTelemedicines,
    isLoading,
    error,
  } = useGetInfiniteMyTelemedicines(myTelemedicinesQuery, {
    select: selectMyTelemedicines,
  });
  const { data: pagination } = useGetInfiniteMyTelemedicines(
    myTelemedicinesQuery,
    { select: selectMyTelemedicinesPagination }
  );
  const hasAnotherMyTelemedicines =
    pagination && !error
      ? pagination.page * pagination.perPage < pagination.total
      : false;
  useEffect(() => {
    if (
      inView &&
      !isFetchingNextPage &&
      hasAnotherMyTelemedicines &&
      isMobile
    ) {
      fetchNextPage();
    }
  }, [
    inView,
    isFetchingNextPage,
    hasAnotherMyTelemedicines,
    fetchNextPage,
    isMobile,
  ]);

  const baseProps = {
    myTelemedicines,
    isLoading: isLoading && !error,
    fetchNextPage,
    isFetchingNextPage,
    hasAnotherMyTelemedicines,
    pagination,
  };
  if (isMobile)
    return <MyTelemedicinesMobile {...baseProps} refInView={refInView} />;
  return <MyTelemedicinesDesktop {...baseProps} />;
}
