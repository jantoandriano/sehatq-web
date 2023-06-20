import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DiseaseListSkeleton, DiseaseListSkeletonProps } from "../disease-list";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Disease / Disease List Skeleton",
  component: DiseaseListSkeleton,
} as Meta;

type DiseaseListStory = StoryObj<DiseaseListSkeletonProps>;

export const Desktop: DiseaseListStory = {
  render: (args) => (
    <Box width="756px" bg="white">
      <DiseaseListSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: DiseaseListStory = {
  render: (args) => (
    <Box width="360px" bg="white">
      <DiseaseListSkeleton {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
