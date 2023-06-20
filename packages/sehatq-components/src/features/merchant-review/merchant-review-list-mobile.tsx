import React from "react";
import { Flex, Box } from "../../user-interfaces";
import { MerchantReview } from "./merchant-review-model";
import {
  MerchantReviewItemMobile,
  MerchantReviewItemMobileSkeleton,
} from "./merchant-review-item-mobile";
import { MerchantReviewFilter } from "./merchant-review-filter";
import { EmptyMerchantReviewList } from "./empty-merchant-review-list";
export type MerchantReviewListMobileProps = {
  reviews: MerchantReview[];
  filterActive: string;
  onChangeFilter?: (value: string) => void;
  refInView?: (node?: Element | null) => void;
  isLoading: boolean;
  isMaxPage?: boolean;
};

export function MerchantReviewListMobile(props: MerchantReviewListMobileProps) {
  const {
    reviews,
    filterActive,
    onChangeFilter,
    isLoading,
    refInView,
    isMaxPage,
  } = props;

  return (
    <Flex direction="column">
      <MerchantReviewFilter
        isMobile
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
            <MerchantReviewItemMobile key={review.id} {...review} />
          ))
        ) : isLoading ? (
          <MerchantReviewItemMobileSkeleton />
        ) : (
          <EmptyMerchantReviewList isMobile />
        )}
      </Box>

      {!isMaxPage && (
        <Box ref={refInView}>
          <MerchantReviewItemMobileSkeleton />
        </Box>
      )}
    </Flex>
  );
}
