import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  FamilyMemberSliderSkeleton,
  FamilyMemberSliderSkeletonProps,
} from "..";

export default {
  title: "Features / Profile / Family Member Slider Skeleton",
  component: FamilyMemberSliderSkeleton,
} as Meta;

type FamilyMemberSliderSkeletonStory =
  StoryObj<FamilyMemberSliderSkeletonProps>;

export const Desktop: FamilyMemberSliderSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <FamilyMemberSliderSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: FamilyMemberSliderSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <FamilyMemberSliderSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
