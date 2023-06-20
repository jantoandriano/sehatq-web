import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ForumList, ForumListProps } from "..";

export default {
  title: "Features / Forum / Forum List",
  component: ForumList,
} as Meta;

type ForumListStory = StoryObj<ForumListProps>;

const defaultArgs = {
  page: 1,
  perPage: 10,
  sortBy: "newest",
  answered: true,
};
export const Mobile: ForumListStory = {
  render: (args) => (
    <Box width="328px">
      <ForumList {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Desktop: ForumListStory = {
  render: (args) => (
    <Box width="760px">
      <ForumList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
