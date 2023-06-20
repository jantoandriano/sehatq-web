import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicHeadlineSkeleton,
  PediatricClinicHeadlineSkeletonProps,
} from "../pediatric-clinic-headline";

export default {
  title: "Features / Landing Page / Pediatric Clinic Headline Skeleton",
  component: PediatricClinicHeadlineSkeleton,
} as Meta;

type PediatricClinicHeadlineSkeletonStory =
  StoryObj<PediatricClinicHeadlineSkeletonProps>;

export const Desktop: PediatricClinicHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="1440px">
      <PediatricClinicHeadlineSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: PediatricClinicHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicHeadlineSkeleton {...args} isMobile />
    </Box>
  ),
};
