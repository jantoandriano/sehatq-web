import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionRecommendationPopupSkeleton,
  PrescriptionRecommendationPopupSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Recommendation Popup Skeleton",
  component: PrescriptionRecommendationPopupSkeleton,
} as Meta;

type PrescriptionRecommendationPopupSkeletonStory =
  StoryObj<PrescriptionRecommendationPopupSkeletonProps>;

export const Desktop: PrescriptionRecommendationPopupSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionRecommendationPopupSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionRecommendationPopupSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionRecommendationPopupSkeleton isMobile />
    </Box>
  ),
  args: {},
};
