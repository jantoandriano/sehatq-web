import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionOrderCardSkeleton,
  PrescriptionOrderCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Order Card Skeleton",
  component: PrescriptionOrderCardSkeleton,
} as Meta;

type PrescriptionOrderCardSkeletonStory =
  StoryObj<PrescriptionOrderCardSkeletonProps>;

export const Desktop: PrescriptionOrderCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionOrderCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionOrderCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionOrderCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
