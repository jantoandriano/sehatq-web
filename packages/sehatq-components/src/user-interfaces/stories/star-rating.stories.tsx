import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, StarRating, StarRatingProps } from "..";

export default {
  title: "UI / Star Rating",
  component: StarRating,
} as Meta;

type StarRatingStory = StoryObj<StarRatingProps>;

export const Basic: StarRatingStory = {
  render: (args) => (
    <Box>
      <StarRating {...args} />
    </Box>
  ),
  args: {
    rating: 4.5,
    ratingTotal: 10,
    iconWidth: 3,
    iconHeight: 3,
  },
};
