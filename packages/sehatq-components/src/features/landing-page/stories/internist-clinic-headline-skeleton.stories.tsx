import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicHeadlineSkeleton,
  InternistClinicHeadlineSkeletonProps,
} from "../internist-clinic-headline";

export default {
  title: "Features / Landing Page / Internist Clinic Headline Skeleton",
  component: InternistClinicHeadlineSkeleton,
} as Meta;

type InternistClinicHeadlineSkeletonStory =
  StoryObj<InternistClinicHeadlineSkeletonProps>;

export const Desktop: InternistClinicHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="1440px">
      <InternistClinicHeadlineSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: InternistClinicHeadlineSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicHeadlineSkeleton {...args} isMobile />
    </Box>
  ),
};
