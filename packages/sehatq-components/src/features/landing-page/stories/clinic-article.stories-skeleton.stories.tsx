import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ClinicArticleSkeleton,
  ClinicArticleSkeletonProps,
} from "../clinic-article";

export default {
  title: "Features / Landing Page / Clinic Article Skeleton",
  component: ClinicArticleSkeleton,
} as Meta;

type ClinicArticleSkeletonStory = StoryObj<ClinicArticleSkeletonProps>;

export const Desktop: ClinicArticleSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicArticleSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ClinicArticleSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicArticleSkeleton {...args} isMobile />
    </Box>
  ),
};
