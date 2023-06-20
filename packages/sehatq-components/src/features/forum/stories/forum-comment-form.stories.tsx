import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentFormProps, ForumCommentForm } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Comment Form",
  component: ForumCommentForm,
} as Meta;

type ForumCommentFormStory = StoryObj<ForumCommentFormProps>;

export const Desktop: ForumCommentFormStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCommentForm {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    forumId: 4250,
  },
};

export const Mobile: ForumCommentFormStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCommentForm {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    forumId: 4250,
  },
};
