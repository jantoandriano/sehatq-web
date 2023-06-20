import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ClinicForumSkeleton, ClinicForumSkeletonProps } from "../clinic-forum";

export default {
  title: "Features / Landing Page / Clinic Forum Skeleton",
  component: ClinicForumSkeleton,
} as Meta;

type ClinicForumSkeletonStory = StoryObj<ClinicForumSkeletonProps>;

export const Desktop: ClinicForumSkeletonStory = {
  render: (args) => (
    <Box width="1106px">
      <ClinicForumSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ClinicForumSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicForumSkeleton {...args} isMobile />
    </Box>
  ),
};
