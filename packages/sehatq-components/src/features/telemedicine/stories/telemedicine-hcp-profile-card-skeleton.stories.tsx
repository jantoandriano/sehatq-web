import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHcpProfileCardSkeleton } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Profile Card Skeleton",
  component: TelemedicineHcpProfileCardSkeleton,
} as Meta;

type TelemedicineHcpProfileCardSkeletonStory = StoryObj;

export const Desktop: TelemedicineHcpProfileCardSkeletonStory = {
  render: () => (
    <Box width="694px">
      <TelemedicineHcpProfileCardSkeleton />
    </Box>
  ),
};

export const Mobile: TelemedicineHcpProfileCardSkeletonStory = {
  render: () => (
    <Box width="360px">
      <TelemedicineHcpProfileCardSkeleton isMobile />
    </Box>
  ),
};
