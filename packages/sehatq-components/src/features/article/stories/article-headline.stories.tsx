import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleHeadline, ArticleHeadlineProps } from "..";

export default {
  title: "Features / Article / Headline",
  component: ArticleHeadline,
} as Meta;

type ArticleHeadlineStory = StoryObj<ArticleHeadlineProps>;
export const Mobile: ArticleHeadlineStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleHeadline {...args} isMobile />
    </Box>
  ),
  args: {
    articleSlug: "kenali-7-fakta-menyusui-ini-dan-manfaat-asi",
  },
};

export const Desktop: ArticleHeadlineStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleHeadline {...args} />
    </Box>
  ),
  args: {
    articleSlug: "kenali-7-fakta-menyusui-ini-dan-manfaat-asi",
  },
};
