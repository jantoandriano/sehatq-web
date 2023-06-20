import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHealthToolSkeleton,
  InternistClinicHealthToolSkeletonProps,
} from "../internist-clinic-health-tool";

export default {
  title: "Features / Landing Page / Internist ClinicHealth Tool Skeleton",
  component: InternistClinicHealthToolSkeleton,
} as Meta;

type InternistClinicHealthToolSkeletonStory =
  StoryObj<InternistClinicHealthToolSkeletonProps>;

export const Desktop: InternistClinicHealthToolSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicHealthToolSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: InternistClinicHealthToolSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHealthToolSkeleton {...args} isMobile />
    </Box>
  ),
};
