import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ReviewsSectionProps, ReviewsSection } from "../reviews-section";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Tag / Reviews Section",
  component: ReviewsSection,
} as Meta;

type ReviewsSectionStory = StoryObj<ReviewsSectionProps>;

export const Desktop: ReviewsSectionStory = {
  render: (args) => (
    <Box width="352px">
      <ReviewsSection {...args} />
    </Box>
  ),
  args: {
    tag: "terbakar matahari",
  },
};

export const Mobile: ReviewsSectionStory = {
  render: (args) => (
    <Box width="360px">
      <ReviewsSection {...args} />
    </Box>
  ),
  args: {
    tag: "terbakar matahari",
    isMobile: true,
  },
};
