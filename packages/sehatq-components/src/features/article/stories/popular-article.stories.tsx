import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { PopularArticles, PopularArticleProps } from "../popular-articles";

export default {
  title: "Features / Article / Popular Article",
  component: PopularArticles,
} as Meta;

type PopularArticlesStory = StoryObj<PopularArticleProps>;
export const Desktop: PopularArticlesStory = {
  render: (args) => (
    <Box width="xs">
      <PopularArticles {...args} />
    </Box>
  ),
  args: {
    limit: 5,
    viewDate: "2-week-ago",
  },
};
