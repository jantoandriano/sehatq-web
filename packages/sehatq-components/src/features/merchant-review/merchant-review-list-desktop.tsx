import React from "react";
import { Flex, Box } from "../../user-interfaces";
import { MerchantReview } from "./merchant-review-model";
import { MerchantReviewFilter } from "./merchant-review-filter";
import {
  MerchantReviewItemDesktop,
  MerchantReviewItemDesktopSkeleton,
} from "./merchant-review-item-desktop";
import { EmptyMerchantReviewList } from "./empty-merchant-review-list";
import { GeneratePagination } from "./merchant-review-pagination-list";

export type MerchantReviewListDesktopProps = {
  reviews: MerchantReview[];
  filterActive: string;
  pagination: {
    page: number;
    total: number;
    perPage: number;
    maxPage: number;
  };
  onChangePage?: (value: number) => void;
  onChangeFilter?: (value: string) => void;
  isLoading: boolean;
};

export function MerchantReviewListDesktop(
  props: MerchantReviewListDesktopProps
) {
  const {
    reviews,
    filterActive,
    pagination,
    onChangePage,
    onChangeFilter,
    isLoading,
  } = props;

  return (
    <Flex flexDirection="column">
      <MerchantReviewFilter
        isMobile={false}
        filterOptions={[
          { id: "", label: "Semua" },
          { id: "5", label: "5" },
          { id: "4", label: "4" },
          { id: "3", label: "3" },
          { id: "2", label: "2" },
          { id: "1", label: "1" },
        ]}
        filterActive={filterActive}
        onChangeFilter={onChangeFilter}
      />
      <Box pt={3}>
        {reviews.length > 0 ? (
          reviews.map((review: MerchantReview) => (
            <MerchantReviewItemDesktop key={review.id} {...review} />
          ))
        ) : isLoading ? (
          <MerchantReviewItemDesktopSkeleton />
        ) : (
          <EmptyMerchantReviewList isMobile />
        )}
      </Box>
      <GeneratePagination
        page={pagination.page}
        maxPage={pagination.maxPage}
        onChangePage={onChangePage}
      />
    </Flex>
  );
}
