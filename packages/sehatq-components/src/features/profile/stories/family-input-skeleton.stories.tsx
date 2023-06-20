import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { FamilyInputSkeleton, FamilyInputSkeletonProps } from "..";

export default {
  title: "Features / Profile / Family Input Skeleton",
  component: FamilyInputSkeleton,
} as Meta;

type FamilyInputSkeletonStory = StoryObj<FamilyInputSkeletonProps>;
export const Desktop: FamilyInputSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <FamilyInputSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: FamilyInputSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <FamilyInputSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
