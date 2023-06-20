import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ForumCommentProps, ForumComment } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Forum / Forum Comment",
  component: ForumComment,
} as Meta;

type ForumCommentStory = StoryObj<ForumCommentProps>;

export const Desktop: ForumCommentStory = {
  render: (args) => (
    <Box width="760px">
      <ForumComment {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    commentId: 452,
    createdBy: "AR",
    createdAt: "2022-06-06 13:19:32",
    comment:
      "Selamat siang dok, saya baru saja berhubungan dengan suami 2 hari lalu Sehari setelah itu saya mengalami rasa tidak nyaman di vagina dan kram perut dan juga mual setelah makan. Padahal saya berhubungan menggunakan kontrasepsi(kondom) dok, apakah kemungkinan hamil dok?",
    onClickReply: (data: { commentId: number; createdBy: string }) =>
      console.log(
        `onclick reply ${data.commentId} comment by ${data.commentId} `
      ),
    showActions: true,
    gender: "M",
  },
};

export const Mobile: ForumCommentStory = {
  render: (args) => (
    <Box width="328px">
      <ForumComment {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
    gender: "F",
  },
};
