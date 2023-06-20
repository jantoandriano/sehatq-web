import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPExperienceRatingSkeleton } from "..";
export default {
  title:
    "Features / Telemedicine / Telemedicine HCP Experience Rating Skeleton",
  component: TelemedicineHCPExperienceRatingSkeleton,
} as Meta;

type TelemedicineHCPExperienceRatingSkeletonStory = StoryObj;

export const Desktop: TelemedicineHCPExperienceRatingSkeletonStory = {
  render: () => (
    <Box width="376px">
      <TelemedicineHCPExperienceRatingSkeleton />
    </Box>
  ),
};

export const Mobile: TelemedicineHCPExperienceRatingSkeletonStory = {
  render: () => (
    <Box width="360px">
      <TelemedicineHCPExperienceRatingSkeleton isMobile />
    </Box>
  ),
};
