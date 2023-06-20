import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingCampaignSkeleton,
  TelemedicineLandingCampaignSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Landing Campaign Skeleton",
  component: TelemedicineLandingCampaignSkeleton,
} as Meta;

type TelemedicineLandingCampaignSkeletonStory =
  StoryObj<TelemedicineLandingCampaignSkeletonProps>;

export const Desktop: TelemedicineLandingCampaignSkeletonStory = {
  render: () => (
    <Box width="1060px">
      <TelemedicineLandingCampaignSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: TelemedicineLandingCampaignSkeletonStory = {
  render: () => (
    <Box width="328px">
      <TelemedicineLandingCampaignSkeleton isMobile />
    </Box>
  ),
  args: {},
};
