import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  EmptyHealthCareProfessionalList,
  EmptyHealthCareProfessionalListProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Empty Health Care Professional List",
  component: EmptyHealthCareProfessionalList,
} as Meta;

type EmptyHealthCareProfessionalListStory =
  StoryObj<EmptyHealthCareProfessionalListProps>;

export const Mobile: EmptyHealthCareProfessionalListStory = {
  render: (args) => (
    <Box width="328px">
      <EmptyHealthCareProfessionalList {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: EmptyHealthCareProfessionalListStory = {
  render: (args) => (
    <Box width="760px">
      <EmptyHealthCareProfessionalList {...args} />
    </Box>
  ),
  args: {},
};
