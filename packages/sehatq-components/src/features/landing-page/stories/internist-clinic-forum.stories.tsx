import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  InternistClinicForum,
  InternistClinicForumProps,
} from "../internist-clinic-forum";
export default {
  title: "Features / Landing Page / Internist Clinic Forum",
  component: InternistClinicForum,
} as Meta;

type InternistClinicForumStory = StoryObj<InternistClinicForumProps>;
export const Desktop: InternistClinicForumStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};
export const Mobile: InternistClinicForumStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
