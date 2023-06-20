import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  DiseaseHeadlineSkeleton,
  DiseaseHeadlineSkeletonProps,
} from "../disease-headline";

export default {
  title: "Features / Disease / Disease Headline Skeleton",
  component: DiseaseHeadlineSkeleton,
} as Meta;

type DiseaseHeadlineSkeletonStory = StoryObj<DiseaseHeadlineSkeletonProps>;

export const Mobile: DiseaseHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <DiseaseHeadlineSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: DiseaseHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <DiseaseHeadlineSkeleton {...args} />
    </Box>
  ),
  args: {},
};
