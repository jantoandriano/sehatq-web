import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  ShippingAddressFormSkeleton,
  ShippingAddressFormSkeletonProps,
} from "..";

export default {
  title: "Features / Profile / Shipping Address Form Skeleton",
  component: ShippingAddressFormSkeleton,
} as Meta;

type ShippingAddressFormSkeletonStory =
  StoryObj<ShippingAddressFormSkeletonProps>;
export const Desktop: ShippingAddressFormSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ShippingAddressFormSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ShippingAddressFormSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ShippingAddressFormSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
