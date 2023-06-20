import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RegularTelemedicineBannerSkeleton,
  RegularTelemedicineBannerSkeletonProps,
} from "..";

export default {
  title: "Features / Telemedicine / Regular Telemedicine Banner Skeleton",
  component: RegularTelemedicineBannerSkeleton,
} as Meta;

type RegularTelemedicineBannerSkeletonStory =
  StoryObj<RegularTelemedicineBannerSkeletonProps>;

export const Desktop: RegularTelemedicineBannerSkeletonStory = {
  render: () => (
    <Box width="499px">
      <RegularTelemedicineBannerSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: RegularTelemedicineBannerSkeletonStory = {
  render: () => (
    <Box width="328px">
      <RegularTelemedicineBannerSkeleton isMobile />
    </Box>
  ),
  args: {},
};
