import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  MyTelemedicineHistoryBannerSkeleton,
  MyTelemedicineHistoryBannerSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / My Telemedicine History Banner Skeleton",
  component: MyTelemedicineHistoryBannerSkeleton,
} as Meta;

type MyTelemedicineHistoryBannerSkeletonStory =
  StoryObj<MyTelemedicineHistoryBannerSkeletonProps>;

export const Desktop: MyTelemedicineHistoryBannerSkeletonStory = {
  render: () => (
    <Box width="760px">
      <MyTelemedicineHistoryBannerSkeleton />
    </Box>
  ),
  args: {},
};
