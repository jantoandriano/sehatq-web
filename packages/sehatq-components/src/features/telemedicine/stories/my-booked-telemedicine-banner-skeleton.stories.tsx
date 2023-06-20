import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyBookedTelemedicineBannerSkeleton,
  MyBookedTelemedicineBannerSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / My Booked Telemedicine Banner Skeleton",
  component: MyBookedTelemedicineBannerSkeleton,
} as Meta;

type MyBookedTelemedicineBannerSkeletonStory =
  StoryObj<MyBookedTelemedicineBannerSkeletonProps>;

export const Desktop: MyBookedTelemedicineBannerSkeletonStory = {
  render: () => (
    <Box width="1086px">
      <MyBookedTelemedicineBannerSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: MyBookedTelemedicineBannerSkeletonStory = {
  render: () => (
    <Box width="328px">
      <MyBookedTelemedicineBannerSkeleton isMobile />
    </Box>
  ),
  args: {},
};
