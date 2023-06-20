import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalDistrictLinks,
  HealthCareProfessionalDistrictLinksProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional District Links",
  component: HealthCareProfessionalDistrictLinks,
} as Meta;

type HealthCareProfessionalDistrictLinksStory =
  StoryObj<HealthCareProfessionalDistrictLinksProps>;

const defaultArgs = {
  citySlug: "denpasar",
  specialitySlug: "anak",
};

export const Mobile: HealthCareProfessionalDistrictLinksStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalDistrictLinks {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalDistrictLinksStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalDistrictLinks {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
