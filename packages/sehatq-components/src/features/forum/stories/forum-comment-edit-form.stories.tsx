import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentEditFormProps, ForumCommentEditForm } from "..";

export default {
  title: "Features / Forum / Forum Comment Edit Form",
  component: ForumCommentEditForm,
} as Meta;

const defaultArgs = {
  forumId: 4250,
  commentId: 1,
  comment: "Ubah komentar ini dengan bahasa yg lebih baik.",
};
type ForumCommentEditFormStory = StoryObj<ForumCommentEditFormProps>;
export const Desktop: ForumCommentEditFormStory = {
  render: (args) => <ForumCommentEditForm {...args} />,
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: ForumCommentEditFormStory = {
  render: (args) => <ForumCommentEditForm {...args} />,
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
