import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ConsultationProductsInfoSkeleton,
  ConsultationProductsInfoSkeletonProps,
} from "..";

export default {
  title: "Features / Prescription / Consultation Products Info Skeleton",
  component: ConsultationProductsInfoSkeleton,
} as Meta;

type ConsultationProductsInfoSkeletonStory =
  StoryObj<ConsultationProductsInfoSkeletonProps>;

export const Desktop: ConsultationProductsInfoSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationProductsInfoSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ConsultationProductsInfoSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ConsultationProductsInfoSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
