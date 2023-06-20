import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MerchantReviewItem, MerchantReviewItemProps } from "..";

export default {
  title: "Features / Review / Merchant / Item",
  component: MerchantReviewItem,
} as Meta;

type MerchantReviewItemStory = StoryObj<MerchantReviewItemProps>;
const review = {
  id: "i2i49dsj293j2iu2893",
  merchantId: 1,
  rating: 4,
  review: "bagus bangget nih",
  createdAt: "25 Mar 2022",
  userName: "Susan Sau",
  tags: [
    "Packing rapi dan aman",
    "Kecepatan respon penjual perlu ditingkatkan",
  ],
};
export const Mobile: MerchantReviewItemStory = {
  render: (args) => (
    <Box width="328px">
      <MerchantReviewItem {...args} isMobile />
    </Box>
  ),
  args: {
    ...review,
  },
};

export const Desktop: MerchantReviewItemStory = {
  render: (args) => (
    <Box width="760px">
      <MerchantReviewItem {...args} />
    </Box>
  ),
  args: {
    ...review,
  },
};
