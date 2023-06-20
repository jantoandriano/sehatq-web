import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProductCardProps, ProductCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Product / Product Card",
  component: ProductCard,
} as Meta;

type ProductCardStory = StoryObj<ProductCardProps>;

export const DesktopWithDiscountMax: ProductCardStory = {
  render: (args) => (
    <Box width="178px">
      <ProductCard {...args} />
    </Box>
  ),
  args: {
    name: "Aclonac Emulsi Gel 1 % 20 g",
    imageUrl:
      "https://static.sehatq.com/cdn-cgi/image/f=auto/tokoq_dev/products/variants/1jqmqprxinkz333yhqm5vuug5yor/1ae2ea8cded1dc97e77d9bfc3402418b0ac768ef0dd6da62285b50baaff8fe48",
    slug: "aclonac-emulsi-gel-1-20-g8",
    priceFrom: "Rp 265.700",
    priceTo: "Rp 105.000",
    rating: 4.37,
    ratingTotal: 1909,
    discountMax: "10%",
  },
};

export const DesktopWithoutDiscountMax: ProductCardStory = {
  ...DesktopWithDiscountMax,
  args: {
    name: "Aclonac Emulsi Gel 1 % 20 g",
    imageUrl:
      "https://static.sehatq.com/cdn-cgi/image/f=auto/tokoq_dev/products/variants/1jqmqprxinkz333yhqm5vuug5yor/1ae2ea8cded1dc97e77d9bfc3402418b0ac768ef0dd6da62285b50baaff8fe48",
    slug: "aclonac-emulsi-gel-1-20-g8",
    priceFrom: "Rp 265.700",
    priceTo: "Rp 105.000",
    rating: 4.37,
    ratingTotal: 1909,
    discount: "45%",
  },
};

export const Mobile: ProductCardStory = {
  render: (args) => (
    <Box width="144px">
      <ProductCard {...args} />
    </Box>
  ),
  args: {
    ...DesktopWithDiscountMax.args,
    isMobile: true,
  },
};
