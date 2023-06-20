import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  ShippingAddressInputSkeletonProps,
  ShippingAddressInputSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Shipping Address Input Skeleton",
  component: ShippingAddressInputSkeleton,
} as Meta;

type ShippingAddressInputSkeletonStory =
  StoryObj<ShippingAddressInputSkeletonProps>;

export const Desktop: ShippingAddressInputSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ShippingAddressInputSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ShippingAddressInputSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ShippingAddressInputSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
