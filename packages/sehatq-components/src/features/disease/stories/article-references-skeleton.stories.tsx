import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseReferenceSkeleton,
  ArticleReferenceSkeletonProps,
} from "../disease-reference";

export default {
  title: "Features / Disease / Disease Reference Skeleton",
  component: DiseaseReferenceSkeleton,
} as Meta;

type DiseaseReferenceSkeletonStory = StoryObj<ArticleReferenceSkeletonProps>;

export const Mobile: DiseaseReferenceSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <DiseaseReferenceSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: DiseaseReferenceSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseReferenceSkeleton {...args} />
    </Box>
  ),
  args: {},
};
