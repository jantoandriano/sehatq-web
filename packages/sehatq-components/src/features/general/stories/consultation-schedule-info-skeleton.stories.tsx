import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ConsultationScheduleInfoSkeleton,
  ConsultationScheduleInfoSkeletonProps,
} from "..";

export default {
  title: "Features / General / Consultation Schedule Info Skeleton",
  component: ConsultationScheduleInfoSkeleton,
} as Meta;

type ConsultationScheduleInfoSkeletonStory =
  StoryObj<ConsultationScheduleInfoSkeletonProps>;

export const Mobile: ConsultationScheduleInfoSkeletonStory = {
  render: (args) => (
    <Box width="244px">
      <ConsultationScheduleInfoSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ConsultationScheduleInfoSkeletonStory = {
  render: (args) => (
    <Box width="244px">
      <ConsultationScheduleInfoSkeleton {...args} />
    </Box>
  ),
  args: {},
};
