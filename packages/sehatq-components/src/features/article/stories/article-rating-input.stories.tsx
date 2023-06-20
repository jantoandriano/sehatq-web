import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleRatingInput, ArticleRatingInputProps } from "..";

export default {
  title: "Features / Article / Rating Input",
  component: ArticleRatingInput,
} as Meta;

type ArticleRatingInputStory = StoryObj<ArticleRatingInputProps>;
export const Mobile: ArticleRatingInputStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleRatingInput {...args} isMobile />
    </Box>
  ),
  args: {
    articleId: 231,
  },
};

export const Desktop: ArticleRatingInputStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleRatingInput {...args} />
    </Box>
  ),
  args: {
    articleId: 231,
  },
};
