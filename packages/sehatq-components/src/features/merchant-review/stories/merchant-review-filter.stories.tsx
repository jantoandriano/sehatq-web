import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MerchantReviewFilter, MerchantReviewFilterProps } from "..";

export default {
  title: "Features / Review / Merchant / Filter",
  component: MerchantReviewFilter,
} as Meta;

type MerchantReviewFilterStory = StoryObj<MerchantReviewFilterProps>;

export const Mobile: MerchantReviewFilterStory = {
  render: (args) => (
    <Box width="328px">
      <MerchantReviewFilter {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: MerchantReviewFilterStory = {
  render: (args) => (
    <Box width="760px">
      <MerchantReviewFilter {...args} />
    </Box>
  ),
  args: {},
};
