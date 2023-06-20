import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MerchantProductCardSkeletonProps,
  MerchantProductCardSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Product / Merchant Product Card Skeleton",
  component: MerchantProductCardSkeleton,
} as Meta;

type MerchantProductCardSkeletonStory =
  StoryObj<MerchantProductCardSkeletonProps>;

export const Desktop: MerchantProductCardSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <MerchantProductCardSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: MerchantProductCardSkeletonStory = {
  ...Desktop,
  args: {
    isMobile: true,
  },
};
