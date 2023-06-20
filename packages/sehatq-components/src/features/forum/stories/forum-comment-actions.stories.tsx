import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentActionsProps, ForumCommentActions } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Comment Actions",
  component: ForumCommentActions,
} as Meta;

const defaultArgs = {
  forumId: 4250,
  commentId: 1,
  commentBy: "YD",
  comment: "Ubah komentar ini dengan bahasa yg lebih baik.",
};
type ForumCommentActionsStory = StoryObj<ForumCommentActionsProps>;
export const Desktop: ForumCommentActionsStory = {
  render: (args) => (
    <Box width="720px">
      <ForumCommentActions {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: ForumCommentActionsStory = {
  render: (args) => (
    <Box width="320px">
      <ForumCommentActions {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
