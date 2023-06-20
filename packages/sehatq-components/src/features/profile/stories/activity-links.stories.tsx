import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ActivityLinks, ActivityLinksProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Activity Links",
  component: ActivityLinks,
} as Meta;

type ActivityLinksStory = StoryObj<ActivityLinksProps>;

export const Desktop: ActivityLinksStory = {
  render: (args) => (
    <Box width="280px">
      <ActivityLinks {...args} />
    </Box>
  ),
  args: {
    activeLink: "MY_TELEMEDICINES",
  },
};

export const Mobile: ActivityLinksStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
