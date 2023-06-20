import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCFSSkeleton,
  TelemedicineLandingHCFSSkeletonProps,
} from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Facilities Skeleton",
  component: TelemedicineLandingHCFSSkeleton,
} as Meta;

type TelemedicineLandingHCFSSkeletonStory =
  StoryObj<TelemedicineLandingHCFSSkeletonProps>;

export const Desktop: TelemedicineLandingHCFSSkeletonStory = {
  render: () => (
    <Box width="1086px">
      <TelemedicineLandingHCFSSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCFSSkeletonStory = {
  render: () => (
    <Box width="360px">
      <TelemedicineLandingHCFSSkeleton isMobile />
    </Box>
  ),
  args: {},
};
