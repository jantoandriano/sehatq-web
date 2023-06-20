import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCPSSkeleton,
  TelemedicineLandingHCPSSkeletonProps,
} from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Professionals Skeleton",
  component: TelemedicineLandingHCPSSkeleton,
} as Meta;

type TelemedicineLandingHCPSSkeletonStory =
  StoryObj<TelemedicineLandingHCPSSkeletonProps>;

export const Desktop: TelemedicineLandingHCPSSkeletonStory = {
  render: () => (
    <Box width="960px">
      <TelemedicineLandingHCPSSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCPSSkeletonStory = {
  render: () => (
    <Box width="328px">
      <TelemedicineLandingHCPSSkeleton isMobile />
    </Box>
  ),
  args: {},
};
