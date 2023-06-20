import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { DCPInputSkeleton, DCPInputSkeletonProps } from "..";

export default {
  title: "Features / General / DCP Input Skeleton",
  component: DCPInputSkeleton,
} as Meta;

type DCPInputSkeletonStory = StoryObj<DCPInputSkeletonProps>;

export const Desktop: DCPInputSkeletonStory = {
  render: (args) => (
    <Flex width="760px" justifyContent="center">
      <DCPInputSkeleton {...args} />
    </Flex>
  ),
  args: {},
};

export const Mobile: DCPInputSkeletonStory = {
  render: (args) => (
    <Flex width="360px" justifyContent="end">
      <DCPInputSkeleton {...args} />
    </Flex>
  ),
  args: {
    isMobile: true,
  },
};
