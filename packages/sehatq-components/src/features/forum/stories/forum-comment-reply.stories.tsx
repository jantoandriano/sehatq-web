import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentReplyProps, ForumCommentReply } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Comment Reply",
  component: ForumCommentReply,
} as Meta;

type ForumCommentReplyStory = StoryObj<ForumCommentReplyProps>;

export const Desktop: ForumCommentReplyStory = {
  render: (args) => (
    <Box width="760px">
      <ForumCommentReply {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    commentId: 452,
    createdBy: "dr. RH Rafsanjani",
    createdAt: "2022-06-06 13:19:32",
    comment:
      "Sulfur dapat terkandung dalam berbagai produk perawatan kulit. Selain sabun sulfur, belerang mungkin juga terkandung dalam produk pembersih wajah, masker wajah, hingga lotion.",
  },
};

export const Mobile: ForumCommentReplyStory = {
  render: (args) => (
    <Box width="328px">
      <ForumCommentReply {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
