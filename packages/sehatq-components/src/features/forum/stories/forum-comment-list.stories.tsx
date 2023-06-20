import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentListProps, ForumCommentList } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Comment List",
  component: ForumCommentList,
} as Meta;

const defaultArgs = {
  page: 1,
  perPage: 5,
  forumId: 1043,
};
type ForumCommentListStory = StoryObj<ForumCommentListProps>;
export const Desktop: ForumCommentListStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCommentList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: ForumCommentListStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCommentList {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
