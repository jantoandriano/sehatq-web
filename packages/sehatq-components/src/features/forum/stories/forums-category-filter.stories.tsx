import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumsCategoryFilter, ForumsCategoryFilterProps } from "..";

export default {
  title: "Features / Forum / Forums Category Filter",
  component: ForumsCategoryFilter,
} as Meta;

type ForumsCategoryFilterStory = StoryObj<ForumsCategoryFilterProps>;

export const Desktop: ForumsCategoryFilterStory = {
  render: (args) => (
    <Box width="270px">
      <ForumsCategoryFilter {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: ForumsCategoryFilterStory = {
  render: (args) => (
    <Box width="360px">
      <ForumsCategoryFilter {...args} isMobile />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
