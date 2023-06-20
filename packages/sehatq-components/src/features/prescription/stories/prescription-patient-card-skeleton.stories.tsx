import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionPatientCardSkeleton,
  PrescriptionPatientCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Patient Card Skeleton",
  component: PrescriptionPatientCardSkeleton,
} as Meta;

type PrescriptionPatientCardSkeletonStory =
  StoryObj<PrescriptionPatientCardSkeletonProps>;

export const Desktop: PrescriptionPatientCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionPatientCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionPatientCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionPatientCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
