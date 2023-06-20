import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { ConsultationFormSkeleton, ConsultationFormSkeletonProps } from "..";
export default {
  title: "Features / Telemedicine / Consultation Form Skeleton",
  component: ConsultationFormSkeleton,
} as Meta;

type ConsultationFormSkeletonStory = StoryObj<ConsultationFormSkeletonProps>;

export const Desktop: ConsultationFormSkeletonStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationFormSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ConsultationFormSkeletonStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationFormSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
