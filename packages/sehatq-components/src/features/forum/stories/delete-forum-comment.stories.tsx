import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DeleteForumCommentProps, DeleteForumComment } from "..";

export default {
  title: "Features / Forum / Delete Forum Comment",
  component: DeleteForumComment,
} as Meta;

const defaultArgs = {
  forumId: 4250,
  commentId: 1,
  commentBy: "YD",
};
type DeleteForumCommentStory = StoryObj<DeleteForumCommentProps>;
export const Desktop: DeleteForumCommentStory = {
  render: (args) => <DeleteForumComment {...args} />,
  args: {
    ...defaultArgs,
    isMobile: false,
  },
};

export const Mobile: DeleteForumCommentStory = {
  render: (args) => <DeleteForumComment {...args} />,
  args: {
    ...defaultArgs,
    isMobile: true,
  },
};
