import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PublicMentalHealthToolFaq, PublicMentalHealthToolFaqProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Public Mental Health Tool FAQ",
  component: PublicMentalHealthToolFaq,
} as Meta;

type PublicMentalHealthToolFaqStory = StoryObj<PublicMentalHealthToolFaqProps>;

export const Desktop: PublicMentalHealthToolFaqStory = {
  render: (args) => (
    <Box width="1070px">
      <PublicMentalHealthToolFaq {...args} />
    </Box>
  ),
  args: { isMobile: false },
};

export const Mobile: PublicMentalHealthToolFaqStory = {
  render: (args) => (
    <Box width="320px" px={4} backgroundColor="white">
      <PublicMentalHealthToolFaq {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
