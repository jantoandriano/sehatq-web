import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  SimpleTelemedicineHCPCardSkeleton,
  SimpleTelemedicineHCPCardSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / Simple Telemedicine HCP Card Skeleton",
  component: SimpleTelemedicineHCPCardSkeleton,
} as Meta;

type SimpleTelemedicineHCPCardSkeletonStory =
  StoryObj<SimpleTelemedicineHCPCardSkeletonProps>;

export const Desktop: SimpleTelemedicineHCPCardSkeletonStory = {
  render: () => (
    <Box width="760px">
      <SimpleTelemedicineHCPCardSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: SimpleTelemedicineHCPCardSkeletonStory = {
  render: () => (
    <Box width="328px">
      <SimpleTelemedicineHCPCardSkeleton isMobile />
    </Box>
  ),
  args: {},
};
