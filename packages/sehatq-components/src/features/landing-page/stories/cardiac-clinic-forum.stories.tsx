import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  CardiacClinicForum,
  CardiacClinicForumProps,
} from "../cardiac-clinic-forum";
export default {
  title: "Features / Landing Page / Cardiac Clinic Forum",
  component: CardiacClinicForum,
} as Meta;

type CardiacClinicForumStory = StoryObj<CardiacClinicForumProps>;
export const Desktop: CardiacClinicForumStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicForumStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
