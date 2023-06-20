import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyMentalRecordCardSkeleton,
  MyMentalRecordCardSkeletonProps,
} from "..";

export default {
  title: "Features / My Health Record / My Mental Record Card Skeleton",
  component: MyMentalRecordCardSkeleton,
} as Meta;

type MyMentalRecordCardSkeletonStory =
  StoryObj<MyMentalRecordCardSkeletonProps>;

export const Desktop: MyMentalRecordCardSkeletonStory = {
  render: (args) => (
    <Box width="720px">
      <MyMentalRecordCardSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyMentalRecordCardSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <MyMentalRecordCardSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
