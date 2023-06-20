import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { EmptyForumList, EmptyForumListProps } from "..";

export default {
  title: "Features / Forum / Empty Forum List",
  component: EmptyForumList,
} as Meta;

type EmptyForumListStory = StoryObj<EmptyForumListProps>;

export const Mobile: EmptyForumListStory = {
  render: (args) => (
    <Box width="328px">
      <EmptyForumList {...args} isMobile />
    </Box>
  ),
  args: {
    searchQuery: "asajdka",
  },
};

export const Desktop: EmptyForumListStory = {
  render: (args) => (
    <Box width="760px">
      <EmptyForumList {...args} />
    </Box>
  ),
  args: {
    ...Mobile.args,
  },
};
