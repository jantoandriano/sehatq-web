import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProfileHeaderProps, ProfileHeader } from "../profile-header";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Profile Header",
  component: ProfileHeader,
} as Meta;

type ProfileHeaderStory = StoryObj<ProfileHeaderProps>;

export const Desktop: ProfileHeaderStory = {
  render: (args) => (
    <Box width="320px" background="iceBlue.500" pb={10}>
      <ProfileHeader {...args} />
    </Box>
  ),
  args: {
    headerLabel: "Profil Saya",
  },
};

export const Mobile: ProfileHeaderStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
