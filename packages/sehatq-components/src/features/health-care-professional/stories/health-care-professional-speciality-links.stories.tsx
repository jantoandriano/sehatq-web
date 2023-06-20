import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalSpecialityLinks,
  HealthCareProfessionalSpecialityLinksProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Speciality Links",
  component: HealthCareProfessionalSpecialityLinks,
} as Meta;

type HealthCareProfessionalSpecialityLinksStory =
  StoryObj<HealthCareProfessionalSpecialityLinksProps>;

const defaultArgs = {};

export const Mobile: HealthCareProfessionalSpecialityLinksStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalSpecialityLinks {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalSpecialityLinksStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalSpecialityLinks {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
