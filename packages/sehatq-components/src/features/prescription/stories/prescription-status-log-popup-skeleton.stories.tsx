import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionStatusLogPopupSkeleton,
  PrescriptionStatusLogPopupSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Status Log Popup Skeleton",
  component: PrescriptionStatusLogPopupSkeleton,
} as Meta;

type PrescriptionStatusLogPopupSkeletonStory =
  StoryObj<PrescriptionStatusLogPopupSkeletonProps>;

export const Desktop: PrescriptionStatusLogPopupSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionStatusLogPopupSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionStatusLogPopupSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionStatusLogPopupSkeleton isMobile />
    </Box>
  ),
  args: {},
};
