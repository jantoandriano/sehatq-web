import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  ConsultationHCPInfoSkeleton,
  ConsultationHCPInfoSkeletonProps,
} from "..";
export default {
  title: "Features / Telemedicine / Consultation HCP Info Skeleton",
  component: ConsultationHCPInfoSkeleton,
} as Meta;

type ConsultationHCPInfoSkeletonStory =
  StoryObj<ConsultationHCPInfoSkeletonProps>;

export const Desktop: ConsultationHCPInfoSkeletonStory = {
  render: () => (
    <Box width="760px">
      <ConsultationHCPInfoSkeleton isMobile={false} />
    </Box>
  ),
  args: {},
};

export const Mobile: ConsultationHCPInfoSkeletonStory = {
  render: () => (
    <Box width="328px">
      <ConsultationHCPInfoSkeleton isMobile />
    </Box>
  ),
  args: {},
};
