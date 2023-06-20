import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { NewArticles, NewArticlesProps } from "..";

export default {
  title: "Features / Article / New Articles",
  component: NewArticles,
} as Meta;

type NewArticlesStory = StoryObj<NewArticlesProps>;

export const Mobile: NewArticlesStory = {
  render: (args) => (
    <Box width="328px">
      <NewArticles {...args} isMobile />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};

export const Desktop: NewArticlesStory = {
  render: (args) => (
    <Box width="760px">
      <NewArticles {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};
