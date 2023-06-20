import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ClinicTelemedicineSkeleton,
  ClinicTelemedicineSkeletonProps,
} from "../clinic-telemedicine";

export default {
  title: "Features / Landing Page / Clinic Telemedicine Skeleton",
  component: ClinicTelemedicineSkeleton,
} as Meta;

type ClinicTelemedicineSkeletonStory =
  StoryObj<ClinicTelemedicineSkeletonProps>;

export const Desktop: ClinicTelemedicineSkeletonStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicTelemedicineSkeleton {...args} />
    </Box>
  ),
};

export const Mobile: ClinicTelemedicineSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <ClinicTelemedicineSkeleton {...args} isMobile />
    </Box>
  ),
};
