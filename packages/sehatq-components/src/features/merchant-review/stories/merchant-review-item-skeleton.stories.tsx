import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MerchantReviewItemSkeleton, MerchantReviewItemProps } from "..";

export default {
  title: "Features / Review / Merchant / Skeleton",
  component: MerchantReviewItemSkeleton,
} as Meta;

type MerchantReviewItemSkeletonStory = StoryObj<MerchantReviewItemProps>;

export const Mobile: MerchantReviewItemSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <MerchantReviewItemSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: MerchantReviewItemSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <MerchantReviewItemSkeleton {...args} />
    </Box>
  ),
  args: {},
};
