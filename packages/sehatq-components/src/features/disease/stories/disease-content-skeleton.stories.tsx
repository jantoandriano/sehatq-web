import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseContentSkeleton,
  DiseaseContentSkeletonProps,
} from "../disease-content";

export default {
  title: "Features / Disease / Disease Content Skeleton",
  component: DiseaseContentSkeleton,
} as Meta;

type DiseaseContentSkeletonStory = StoryObj<DiseaseContentSkeletonProps>;

export const Mobile: DiseaseContentSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <DiseaseContentSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: DiseaseContentSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseContentSkeleton {...args} />
    </Box>
  ),
  args: {},
};
