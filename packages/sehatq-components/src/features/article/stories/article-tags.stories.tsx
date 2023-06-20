import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleTags, ArticleTagsProps } from "../article-tags";

export default {
  title: "Features / Article / Tags",
  component: ArticleTags,
} as Meta;

type ArticleTagsStory = StoryObj<ArticleTagsProps>;
export const Mobile: ArticleTagsStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleTags {...args} isMobile />
    </Box>
  ),
  args: {
    articleSlug: "4-manfaat-vitamin-e-untuk-kesehatan-kulit",
  },
};

export const Desktop: ArticleTagsStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleTags {...args} />
    </Box>
  ),
  args: {
    articleSlug: "4-manfaat-vitamin-e-untuk-kesehatan-kulit",
  },
};
