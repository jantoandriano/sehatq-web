import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicDisease,
  InternistClinicDiseaseProps,
} from "../internist-clinic-disease";

export default {
  title: "Features / Landing Page / Internist Clinic Disease",
  component: InternistClinicDisease,
} as Meta;

type InternistClinicDiseaseStory = StoryObj<InternistClinicDiseaseProps>;
export const Desktop: InternistClinicDiseaseStory = {
  render: (args) => (
    <Box width="1106px">
      <InternistClinicDisease {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicDiseaseStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicDisease {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
