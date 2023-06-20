import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalList,
  HealthCareProfessionalListProps,
} from "..";

export default {
  title: "Features / Health Care Professional / Health Care Professional List",
  component: HealthCareProfessionalList,
} as Meta;

type HealthCareProfessionalListStory =
  StoryObj<HealthCareProfessionalListProps>;

const defaultArgs = {
  page: 1,
  perPage: 9,
};
export const Mobile: HealthCareProfessionalListStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalListStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
