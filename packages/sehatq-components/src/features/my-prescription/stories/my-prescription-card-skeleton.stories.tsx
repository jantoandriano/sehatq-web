import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyPrescriptionCardSkeleton,
  MyPrescriptionCardSkeletonProps,
} from "..";
export default {
  title: "Features / My Prescription / My Prescription Card Skeleton",
  component: MyPrescriptionCardSkeleton,
} as Meta;

type MyPrescriptionCardSkeletonStory =
  StoryObj<MyPrescriptionCardSkeletonProps>;

export const Desktop: MyPrescriptionCardSkeletonStory = {
  render: () => (
    <Box width="722px">
      <MyPrescriptionCardSkeleton />
    </Box>
  ),
  args: {},
};

export const Mobile: MyPrescriptionCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <MyPrescriptionCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
