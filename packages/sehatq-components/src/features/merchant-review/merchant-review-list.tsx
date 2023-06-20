import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { MerchantReviewListDesktop } from "./merchant-review-list-desktop";
import { MerchantReviewListMobile } from "./merchant-review-list-mobile";
import {
  useGetInfiniteMerchantReviews,
  InfiniteMerchantReviewsCache,
} from "./merchant-review-queries";
import { MerchantReview } from "./merchant-review-model";
import { EmptyMerchantReviewList } from "./empty-merchant-review-list";

export type MerchantReviewListProps = {
  isMobile: boolean;
  merchantId: string;
  activeFilter?: string;
  perPage?: number;
};

function selectData(merchantReviews: InfiniteMerchantReviewsCache) {
  return merchantReviews.pages.reduce<MerchantReview[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

function selectPagination(merchantReviews: InfiniteMerchantReviewsCache) {
  return merchantReviews.pages[merchantReviews.pages.length - 1].pagination;
}

export function MerchantReviewList(props: MerchantReviewListProps) {
  const { isMobile, merchantId, perPage = 3 } = props;
  const { ref: refInView, inView } = useInView();

  const [page, setPage] = useState(1);
  const [filterActive, setFilterActive] = useState(props.activeFilter ?? "");

  const query = {
    id: merchantId,
    page: isMobile ? 1 : page,
    perPage,
    star: filterActive,
  };

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: merchantReviews,
    isLoading,
    error,
  } = useGetInfiniteMerchantReviews(query, {
    select: selectData,
  });
  const { data: paginationResponse } = useGetInfiniteMerchantReviews(query, {
    select: selectPagination,
  });

  const isMaxPage =
    paginationResponse?.total == 0 ||
    paginationResponse?.page == paginationResponse?.maxPage
      ? true
      : false;

  useEffect(() => {
    if (inView && !isFetchingNextPage && !isMaxPage && isMobile) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, isMaxPage, fetchNextPage, isMobile]);

  function onChangePage(value: number) {
    setPage(value);
  }

  function onChangeFilter(value: string) {
    setFilterActive(value);
    setPage(1);
  }

  const initialPagination = {
    total: 0,
    page,
    perPage,
    maxPage: 0,
  };

  const otherProps = {
    reviews: error ? [] : merchantReviews ?? [],
    pagination: error
      ? initialPagination
      : paginationResponse ?? initialPagination,
    filterActive,
    onChangePage,
    isLoading,
    onChangeFilter,
    refInView: refInView,
    isMaxPage,
  };

  if (otherProps.reviews.length == 0 && filterActive == "") {
    return <EmptyMerchantReviewList isMobile />;
  }

  if (isMobile) {
    return <MerchantReviewListMobile {...otherProps} />;
  }

  return <MerchantReviewListDesktop {...otherProps} />;
}
