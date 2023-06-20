import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Profile Card",
  component: ProfileCard,
} as Meta;

type ProfileCardStory = StoryObj<unknown>;

export const Desktop: ProfileCardStory = {
  render: () => (
    <Box width="760px">
      <ProfileCard />
    </Box>
  ),
};
