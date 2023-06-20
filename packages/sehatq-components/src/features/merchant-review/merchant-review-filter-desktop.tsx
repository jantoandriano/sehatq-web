import React from "react";
import { Text, StarRating, Slider, Button } from "../../user-interfaces";

export type MerchantReviewFilterOptionsDesktopProps = {
  id: string;
  label: string;
};

export type MerchantReviewFilterDesktopProps = {
  filterActive: string;
  filterOptions?: MerchantReviewFilterOptionsDesktopProps[];
  onChangeFilter?: (value: string) => void;
};

export function MerchantReviewFilterDesktop(
  props: MerchantReviewFilterDesktopProps
) {
  const { filterActive, filterOptions, onChangeFilter } = props;

  return (
    <Slider
      slides={filterOptions ?? []}
      slideGap={2.5}
      startSlideIndex={
        filterOptions &&
        filterOptions.findIndex((data) => data.id === filterActive)
      }
      hideArrowButton
      renderSlide={({ slide: options }) => (
        <Button
          variant="chip"
          colorScheme="paleBlue"
          size="sm"
          background={options.id == filterActive ? "white" : undefined}
          isActive={options.id == filterActive}
          onClick={() => onChangeFilter && onChangeFilter(options.id)}
        >
          <StarRating rating={1} range={1} />
          <Text fontSize={14}>{options.label}</Text>
        </Button>
      )}
    />
  );
}
