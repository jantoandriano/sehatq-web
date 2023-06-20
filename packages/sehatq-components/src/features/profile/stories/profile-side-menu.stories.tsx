import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProfileSideMenuProps, ProfileSideMenu } from "../profile-side-menu";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Profile Side Menu",
  component: ProfileSideMenu,
} as Meta;

type ProfileSideMenuStory = StoryObj<ProfileSideMenuProps>;

export const Desktop: ProfileSideMenuStory = {
  render: (args) => (
    <Box width="340px" p={4} background="iceBlue.500">
      <ProfileSideMenu {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};
