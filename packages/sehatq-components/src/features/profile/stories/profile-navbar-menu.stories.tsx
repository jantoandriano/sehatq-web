import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProfileNavbarMenu } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Profile Navbar Menu",
  component: ProfileNavbarMenu,
} as Meta;

type ProfileNavbarMenuStory = StoryObj<unknown>;

export const Desktop: ProfileNavbarMenuStory = {
  render: () => (
    <Box width="300px">
      <ProfileNavbarMenu />
    </Box>
  ),
};
