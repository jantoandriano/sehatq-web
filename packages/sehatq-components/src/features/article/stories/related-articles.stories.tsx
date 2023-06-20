import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { RelatedArticles, RelatedArticlesProps } from "..";

export default {
  title: "Features / Related / Articles",
  component: RelatedArticles,
} as Meta;

type RelatedArticlesStory = StoryObj<RelatedArticlesProps>;

const defaultArgs = {
  articleId: 231,
  quantity: 3,
  tagId: "42,183,707",
};
export const Mobile: RelatedArticlesStory = {
  render: (args) => (
    <Box width="328px">
      <RelatedArticles {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: RelatedArticlesStory = {
  render: (args) => (
    <Box width="760px">
      <RelatedArticles {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
