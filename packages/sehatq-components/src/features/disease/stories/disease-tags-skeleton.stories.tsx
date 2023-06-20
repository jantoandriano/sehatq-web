import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DiseaseTagsSkeleton, DiseaseTagsSkeletonProps } from "../disease-tags";

export default {
  title: "Features / Disease / Disease Tags Skeleton",
  component: DiseaseTagsSkeleton,
} as Meta;

type DiseaseTagsSkeletonStory = StoryObj<DiseaseTagsSkeletonProps>;

export const Desktop: DiseaseTagsSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseTagsSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: DiseaseTagsSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <DiseaseTagsSkeleton {...args} isMobile />
    </Box>
  ),
};
