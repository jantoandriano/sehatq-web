import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicFastFactSkeleton,
  InternistClinicFastFactSkeletonProps,
} from "../internist-clinic-fast-fact";

export default {
  title: "Features / Landing Page / Internist Clinic Fast Fact Skeleton",
  component: InternistClinicFastFactSkeleton,
} as Meta;

type InternistClinicFastFactSkeletonStory =
  StoryObj<InternistClinicFastFactSkeletonProps>;

export const Desktop: InternistClinicFastFactSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicFastFactSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: InternistClinicFastFactSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicFastFactSkeleton {...args} isMobile />
    </Box>
  ),
};
