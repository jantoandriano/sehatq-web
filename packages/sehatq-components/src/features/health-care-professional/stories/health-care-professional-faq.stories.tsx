import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { HealthCareProfessionalFaq, HealthCareProfessionalFaqProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Care Professional / Health Care Professional FAQ",
  component: HealthCareProfessionalFaq,
} as Meta;

type HealthCareProfessionalFaqStory = StoryObj<HealthCareProfessionalFaqProps>;

const defaultArgs = {
  page: 1,
  perPage: 9,
  specialitySlug: "anak",
  citySlug: "denpasar",
  districtSlug: "denpasar-barat",
};
export const Desktop: HealthCareProfessionalFaqStory = {
  render: (args) => (
    <Box width="1070px">
      <HealthCareProfessionalFaq {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: HealthCareProfessionalFaqStory = {
  render: (args) => (
    <Box width="320px" px={4} backgroundColor="white">
      <HealthCareProfessionalFaq {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
