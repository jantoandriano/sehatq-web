import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleReferences, ArticleReferencesProps } from "..";

export default {
  title: "Features / Article / References",
  component: ArticleReferences,
} as Meta;

type ArticleReferencesStory = StoryObj<ArticleReferencesProps>;
export const Mobile: ArticleReferencesStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleReferences {...args} isMobile />
    </Box>
  ),
  args: {
    articleSlug: "4-manfaat-vitamin-e-untuk-kesehatan-kulit",
  },
};

export const Desktop: ArticleReferencesStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleReferences {...args} />
    </Box>
  ),
  args: {
    articleSlug: "4-manfaat-vitamin-e-untuk-kesehatan-kulit",
  },
};
