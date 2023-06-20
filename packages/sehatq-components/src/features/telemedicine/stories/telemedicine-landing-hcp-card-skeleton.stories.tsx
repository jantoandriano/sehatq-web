import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCPCardSkeleton,
  TelemedicineLandingHCPCardSkeletonProps,
} from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine Landing Health Care Professional Card Skeleton",
  component: TelemedicineLandingHCPCardSkeleton,
} as Meta;

type TelemedicineLandingHCPCardSkeletonStory =
  StoryObj<TelemedicineLandingHCPCardSkeletonProps>;

export const Desktop: TelemedicineLandingHCPCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <TelemedicineLandingHCPCardSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCPCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <TelemedicineLandingHCPCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
