import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHealthServiceSkeleton,
  InternistClinicHealthServiceSkeletonProps,
} from "../internist-clinic-health-service";

export default {
  title: "Features / Landing Page / Internist Clinic Health Service Skeleton",
  component: InternistClinicHealthServiceSkeleton,
} as Meta;

type InternistClinicHealthServiceSkeletonStory =
  StoryObj<InternistClinicHealthServiceSkeletonProps>;

export const Desktop: InternistClinicHealthServiceSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicHealthServiceSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: InternistClinicHealthServiceSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHealthServiceSkeleton {...args} isMobile />
    </Box>
  ),
};
