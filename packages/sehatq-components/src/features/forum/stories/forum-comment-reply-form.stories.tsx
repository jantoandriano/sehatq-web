import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentReplyFormProps, ForumCommentReplyForm } from "..";

export default {
  title: "Features / Forum / Forum Comment Reply Form",
  component: ForumCommentReplyForm,
} as Meta;

const defaultArgs = {
  forumId: 4250,
  commentId: 1,
  commentBy: "YD",
};
type ForumCommentReplyFormStory = StoryObj<ForumCommentReplyFormProps>;
export const Desktop: ForumCommentReplyFormStory = {
  render: (args) => <ForumCommentReplyForm {...args} />,
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: ForumCommentReplyFormStory = {
  render: (args) => <ForumCommentReplyForm {...args} />,
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
