import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { OrderDetailSkeleton, OrderDetailSkeletonProps } from "../order-detail";

export default {
  title: "Features / Waiting Payment / Order Detail Skeleton",
  component: OrderDetailSkeleton,
} as Meta;

type OrderDetailSkeletonStory = StoryObj<OrderDetailSkeletonProps>;

export const Desktop: OrderDetailSkeletonStory = {
  render: () => (
    <Box width="760px">
      <OrderDetailSkeleton />
    </Box>
  ),
};

export const Mobile: OrderDetailSkeletonStory = {
  render: () => (
    <Box width="328px">
      <OrderDetailSkeleton isMobile />
    </Box>
  ),
};
