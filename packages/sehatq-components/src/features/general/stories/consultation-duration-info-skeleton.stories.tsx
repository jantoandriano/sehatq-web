import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  ConsultationDurationInfoSkeleton,
  ConsultationDurationInfoSkeletonProps,
} from "..";

export default {
  title: "Features / General / Consultation Duration Info Skeleton",
  component: ConsultationDurationInfoSkeleton,
} as Meta;

type ConsultationDurationInfoSkeletonStory =
  StoryObj<ConsultationDurationInfoSkeletonProps>;

export const Mobile: ConsultationDurationInfoSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationDurationInfoSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ConsultationDurationInfoSkeletonStory = {
  render: (args) => (
    <Box width="300px">
      <ConsultationDurationInfoSkeleton {...args} />
    </Box>
  ),
  args: {},
};
