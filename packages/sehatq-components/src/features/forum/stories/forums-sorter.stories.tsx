import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumsSorter, ForumsSorterProps } from "..";

export default {
  title: "Features / Forum / Forums Sorter",
  component: ForumsSorter,
} as Meta;

type ForumsSorterStory = StoryObj<ForumsSorterProps>;

const defaultArgs = {
  selectedSorter: "newest",
};
export const Mobile: ForumsSorterStory = {
  render: (args) => (
    <Box width="360px">
      <ForumsSorter {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: ForumsSorterStory = {
  render: (args) => (
    <Box width="760px">
      <ForumsSorter {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
