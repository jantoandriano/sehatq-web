import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ClinicProductSkeleton,
  ClinicProductSkeletonProps,
} from "../clinic-product";

export default {
  title: "Features / Landing Page / Clinic Product Skeleton",
  component: ClinicProductSkeleton,
} as Meta;

type ClinicProductSkeletonStory = StoryObj<ClinicProductSkeletonProps>;

export const Desktop: ClinicProductSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicProductSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ClinicProductSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicProductSkeleton {...args} isMobile />
    </Box>
  ),
};
