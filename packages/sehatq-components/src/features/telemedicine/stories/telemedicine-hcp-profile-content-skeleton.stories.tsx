import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPProfileContentSkeleton } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Profile Content Skeleton",
  component: TelemedicineHCPProfileContentSkeleton,
} as Meta;

type TelemedicineHCPProfileContentSkeletonStory = StoryObj;

export const Desktop: TelemedicineHCPProfileContentSkeletonStory = {
  render: () => (
    <Box width="694px">
      <TelemedicineHCPProfileContentSkeleton />
    </Box>
  ),
};

export const Mobile: TelemedicineHCPProfileContentSkeletonStory = {
  render: () => (
    <Box width="360px">
      <TelemedicineHCPProfileContentSkeleton isMobile />
    </Box>
  ),
};
