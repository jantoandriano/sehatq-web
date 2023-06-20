import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionDoctorCardSkeleton,
  PrescriptionDoctorCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Doctor Card Skeleton",
  component: PrescriptionDoctorCardSkeleton,
} as Meta;

type PrescriptionDoctorCardSkeletonStory =
  StoryObj<PrescriptionDoctorCardSkeletonProps>;

export const Desktop: PrescriptionDoctorCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionDoctorCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionDoctorCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionDoctorCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
