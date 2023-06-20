import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  HealthCareProfessionalCityLinks,
  HealthCareProfessionalCityLinksProps,
} from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional City Links",
  component: HealthCareProfessionalCityLinks,
} as Meta;

type HealthCareProfessionalCityLinksStory =
  StoryObj<HealthCareProfessionalCityLinksProps>;

const defaultArgs = { specialitySlug: "anak" };

export const Mobile: HealthCareProfessionalCityLinksStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareProfessionalCityLinks {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: HealthCareProfessionalCityLinksStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareProfessionalCityLinks {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
