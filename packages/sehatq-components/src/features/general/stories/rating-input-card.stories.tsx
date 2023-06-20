import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { RatingInputCard, RatingInputCardProps } from "..";
import { Box, RatingInputValue } from "../../../user-interfaces";

export default {
  title: "Features / General / Rating Input Card",
  component: RatingInputCard,
} as Meta;

type RatingInputCardStory = StoryObj<RatingInputCardProps>;

const defaultArgs = {
  onSubmit: (rating: RatingInputValue) => console.log(rating),
};
export const Desktop: RatingInputCardStory = {
  render: (args) => (
    <Box width="760px">
      <RatingInputCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: RatingInputCardStory = {
  render: (args) => (
    <Box width="328px">
      <RatingInputCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
