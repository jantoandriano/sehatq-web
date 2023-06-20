import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionImagesPopupSkeleton,
  PrescriptionImagesPopupSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Images Skeleton",
  component: PrescriptionImagesPopupSkeleton,
} as Meta;

type PrescriptionImagesPopupSkeletonStory =
  StoryObj<PrescriptionImagesPopupSkeletonProps>;

export const Desktop: PrescriptionImagesPopupSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionImagesPopupSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionImagesPopupSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionImagesPopupSkeleton isMobile />
    </Box>
  ),
  args: {},
};
