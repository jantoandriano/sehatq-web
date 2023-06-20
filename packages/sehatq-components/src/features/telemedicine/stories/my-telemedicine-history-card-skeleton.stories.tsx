import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyTelemedicineHistoryCardSkeleton } from "..";
export default {
  title: "Features / Telemedicine / My Telemedicine History Card Skeleton",
  component: MyTelemedicineHistoryCardSkeleton,
} as Meta;

type MyTelemedicineHistoryCardSkeletonStory = StoryObj;

export const Desktop: MyTelemedicineHistoryCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <MyTelemedicineHistoryCardSkeleton />
    </Box>
  ),
};

export const Mobile: MyTelemedicineHistoryCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <MyTelemedicineHistoryCardSkeleton isMobile />
    </Box>
  ),
};
