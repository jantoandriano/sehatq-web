import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { EmptyMerchantReviewList, EmptyMerchantReviewListProps } from "..";

export default {
  title: "Features / Review / Merchant / Empty",
  component: EmptyMerchantReviewList,
} as Meta;

type EmptyMerchantReviewListStory = StoryObj<EmptyMerchantReviewListProps>;

export const Mobile: EmptyMerchantReviewListStory = {
  render: (args) => (
    <Box width="328px">
      <EmptyMerchantReviewList {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: EmptyMerchantReviewListStory = {
  render: (args) => (
    <Box width="760px">
      <EmptyMerchantReviewList {...args} />
    </Box>
  ),
  args: {},
};
