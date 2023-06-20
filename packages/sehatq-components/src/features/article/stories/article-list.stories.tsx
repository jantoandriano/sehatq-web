import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleList, ArticleListProps } from "..";

export default {
  title: "Features / Article / Article List",
  component: ArticleList,
} as Meta;

type ArticleListStory = StoryObj<ArticleListProps>;

const defaultArgs = {
  page: 1,
  perPage: 10,
};
export const Mobile: ArticleListStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: ArticleListStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
