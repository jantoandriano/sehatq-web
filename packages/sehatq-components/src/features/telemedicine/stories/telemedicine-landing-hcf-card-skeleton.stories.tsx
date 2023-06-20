import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCFCardSkeleton,
  TelemedicineLandingHCFCardSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Landing HCF Card Skeleton",
  component: TelemedicineLandingHCFCardSkeleton,
} as Meta;

type TelemedicineLandingHCFCardSkeletonStory =
  StoryObj<TelemedicineLandingHCFCardSkeletonProps>;

export const Desktop: TelemedicineLandingHCFCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <TelemedicineLandingHCFCardSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingHCFCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <TelemedicineLandingHCFCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
