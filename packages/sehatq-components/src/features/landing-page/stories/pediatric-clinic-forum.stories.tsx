import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicForum,
  PediatricClinicForumProps,
} from "../pediatric-clinic-forum";

export default {
  title: "Features / Landing Page / Pediatric Clinic Forum",
  component: PediatricClinicForum,
} as Meta;

type PediatricClinicForumStory = StoryObj<PediatricClinicForumProps>;
export const Desktop: PediatricClinicForumStory = {
  render: (args) => (
    <Box width="1160px">
      <PediatricClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicForumStory = {
  render: (args) => (
    <Box width="328px">
      <PediatricClinicForum {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
