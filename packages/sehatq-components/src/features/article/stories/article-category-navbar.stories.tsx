import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ArticleCategoryNavbar, ArticleCategoryNavbarProps } from "..";

export default {
  title: "Features / Article / Category Navbar",
  component: ArticleCategoryNavbar,
} as Meta;

type ArticleCategoryNavbarStory = StoryObj<ArticleCategoryNavbarProps>;
export const Mobile: ArticleCategoryNavbarStory = {
  render: (args) => (
    <Box width="328px">
      <ArticleCategoryNavbar {...args} isMobile />
    </Box>
  ),
  args: {},
};

export const Desktop: ArticleCategoryNavbarStory = {
  render: (args) => (
    <Box width="760px">
      <ArticleCategoryNavbar {...args} />
    </Box>
  ),
  args: {},
};
