import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionStatusCardSkeleton,
  PrescriptionStatusCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Status Card Skeleton",
  component: PrescriptionStatusCardSkeleton,
} as Meta;

type PrescriptionStatusCardSkeletonStory =
  StoryObj<PrescriptionStatusCardSkeletonProps>;

export const Desktop: PrescriptionStatusCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionStatusCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionStatusCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionStatusCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
