import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionInfoCardSkeleton,
  PrescriptionInfoCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Info Card Skeleton",
  component: PrescriptionInfoCardSkeleton,
} as Meta;

type PrescriptionInfoCardSkeletonStory =
  StoryObj<PrescriptionInfoCardSkeletonProps>;

export const Desktop: PrescriptionInfoCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionInfoCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionInfoCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionInfoCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
