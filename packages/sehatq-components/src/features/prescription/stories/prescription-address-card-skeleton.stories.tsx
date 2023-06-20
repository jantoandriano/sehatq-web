import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionAddressCardSkeleton,
  PrescriptionAddressCardSkeletonProps,
} from "..";
export default {
  title: "Features / Prescription / Prescription Address Card Skeleton",
  component: PrescriptionAddressCardSkeleton,
} as Meta;

type PrescriptionAddressCardSkeletonStory =
  StoryObj<PrescriptionAddressCardSkeletonProps>;

export const Desktop: PrescriptionAddressCardSkeletonStory = {
  render: () => (
    <Box width="730px">
      <PrescriptionAddressCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: PrescriptionAddressCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <PrescriptionAddressCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
