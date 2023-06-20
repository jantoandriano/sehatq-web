import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ArticlesSectionProps, ArticlesSection } from "../articles-section";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Tag / Articles Section",
  component: ArticlesSection,
} as Meta;

type ArticlesSectionStory = StoryObj<ArticlesSectionProps>;

export const Desktop: ArticlesSectionStory = {
  render: (args) => (
    <Box width="352px">
      <ArticlesSection {...args} />
    </Box>
  ),
  args: {
    tagSlug: "diet-puasa",
  },
};

export const Mobile: ArticlesSectionStory = {
  render: (args) => (
    <Box width="360px">
      <ArticlesSection {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
