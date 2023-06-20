import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MedicalProceduresSectionSkeleton,
  MedicalProceduresSectionSkeletonProps,
} from "../medical-procedures-section";

export default {
  title: "Features / Tag / MedicalProcedures Section Skeleton",
  component: MedicalProceduresSectionSkeleton,
} as Meta;

type MedicalProceduresSectionSkeletonStory =
  StoryObj<MedicalProceduresSectionSkeletonProps>;

export const Desktop: MedicalProceduresSectionSkeletonStory = {
  render: (args) => (
    <Box width="352px">
      <MedicalProceduresSectionSkeleton {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: MedicalProceduresSectionSkeletonStory = {
  render: (args) => (
    <Box width="360px">
      <MedicalProceduresSectionSkeleton {...args} isMobile />
    </Box>
  ),
  args: {},
};
