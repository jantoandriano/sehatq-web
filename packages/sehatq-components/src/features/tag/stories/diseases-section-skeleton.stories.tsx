import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseasesSectionSkeleton,
  DiseasesSectionSkeletonProps,
} from "../diseases-section";

export default {
  title: "Features / Tag / Diseases Section Skeleton",
  component: DiseasesSectionSkeleton,
} as Meta;

type DiseasesSectionSkeletonStory = StoryObj<DiseasesSectionSkeletonProps>;

export const Desktop: DiseasesSectionSkeletonStory = {
  render: (args) => (
    <Box width="352px">
      <DiseasesSectionSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: DiseasesSectionSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <DiseasesSectionSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
