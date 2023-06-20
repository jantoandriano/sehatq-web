import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicHealthServiceSkeleton,
  PediatricClinicHealthServiceSkeletonProps,
} from "../pediatric-clinic-health-service";

export default {
  title: "Features / Landing Page / Pediatric Clinic Health Service Skeleton",
  component: PediatricClinicHealthServiceSkeleton,
} as Meta;

type PediatricClinicHealthServiceSkeletonStory =
  StoryObj<PediatricClinicHealthServiceSkeletonProps>;

export const Desktop: PediatricClinicHealthServiceSkeletonStory = {
  render: (args) => (
    <Box width="1106px">
      <PediatricClinicHealthServiceSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: PediatricClinicHealthServiceSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicHealthServiceSkeleton {...args} isMobile />
    </Box>
  ),
};
