import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MerchantProducts, MerchantProductsProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Product / Merchant Products",
  component: MerchantProducts,
} as Meta;

type ProductInfoStory = StoryObj<MerchantProductsProps>;

export const Desktop: ProductInfoStory = {
  render: (args) => (
    <Box width="1200px">
      <MerchantProducts {...args} isMobile={false} />
    </Box>
  ),
  args: {
    productSlug: "panadol-anak-anak-drops-15-ml",
  },
};

export const Mobile: ProductInfoStory = {
  render: (args) => (
    <Box maxHeight="320px" width="320px" overflowY="auto">
      <MerchantProducts {...args} isMobile />
    </Box>
  ),
  args: {
    productSlug: "panadol-anak-anak-drops-15-ml",
  },
};
