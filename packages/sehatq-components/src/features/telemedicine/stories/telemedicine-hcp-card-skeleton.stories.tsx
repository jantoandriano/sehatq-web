import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPCardSkeleton } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Card Skeleton",
  component: TelemedicineHCPCardSkeleton,
} as Meta;

type TelemedicineHCPCardSkeletonStory = StoryObj;

export const Desktop: TelemedicineHCPCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <TelemedicineHCPCardSkeleton />
    </Box>
  ),
};

export const Mobile: TelemedicineHCPCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <TelemedicineHCPCardSkeleton isMobile />
    </Box>
  ),
};
