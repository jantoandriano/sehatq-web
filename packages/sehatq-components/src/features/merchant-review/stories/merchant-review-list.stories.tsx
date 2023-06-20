import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MerchantReviewList, MerchantReviewListProps } from "..";

export default {
  title: "Features / Review / Merchant / List",
  component: MerchantReviewList,
} as Meta;

type MerchantReviewListStory = StoryObj<MerchantReviewListProps>;

export const Mobile: MerchantReviewListStory = {
  render: (args) => (
    <Box width="328px">
      <MerchantReviewList {...args} isMobile />
    </Box>
  ),
  args: {
    merchantId: "1",
    isMobile: true,
    perPage: 3,
  },
};

export const Desktop: MerchantReviewListStory = {
  render: (args) => (
    <Box width="760px">
      <MerchantReviewList {...args} />
    </Box>
  ),
  args: { merchantId: "1", isMobile: false, perPage: 3 },
};
