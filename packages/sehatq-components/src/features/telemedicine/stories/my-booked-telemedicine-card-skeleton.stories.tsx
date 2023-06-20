import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyBookedTelemedicineCardSkeleton } from "..";
export default {
  title: "Features / Telemedicine / My Booked Telemedicine Card Skeleton",
  component: MyBookedTelemedicineCardSkeleton,
} as Meta;

type MyBookedTelemedicineCardSkeletonStory = StoryObj;

export const Desktop: MyBookedTelemedicineCardSkeletonStory = {
  render: () => (
    <Box width="720px">
      <MyBookedTelemedicineCardSkeleton />
    </Box>
  ),
};

export const Mobile: MyBookedTelemedicineCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <MyBookedTelemedicineCardSkeleton isMobile />
    </Box>
  ),
};
