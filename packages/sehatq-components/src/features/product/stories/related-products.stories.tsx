import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { RelatedProductsProps, RelatedProducts } from "../related-products";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Product / Related Products",
  component: RelatedProducts,
} as Meta;

type RelatedProductsStory = StoryObj<RelatedProductsProps>;

export const Desktop: RelatedProductsStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedProducts {...args} />
    </Box>
  ),
  args: {
    tagSlug: "",
  },
};

export const Mobile: RelatedProductsStory = {
  render: (args) => (
    <Box width="360px">
      <RelatedProducts {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
