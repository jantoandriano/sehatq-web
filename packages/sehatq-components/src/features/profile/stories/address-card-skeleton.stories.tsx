import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { AddressCardSkeleton, AddressCardSkeletonProps } from "..";

export default {
  title: "Features / Profile / Address Card Skeleton",
  component: AddressCardSkeleton,
} as Meta;

type AddressCardSkeletonStory = StoryObj<AddressCardSkeletonProps>;
export const Desktop: AddressCardSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <AddressCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: AddressCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <AddressCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
