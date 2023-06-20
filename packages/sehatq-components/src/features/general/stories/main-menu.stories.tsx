import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "../..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / General / Main Menu ",
  component: MainMenu,
} as Meta;

type MainMenuStory = StoryObj<unknown>;

export const Desktop: MainMenuStory = {
  render: () => (
    <Box width="528px">
      <MainMenu />
    </Box>
  ),
};

export const Mobile: MainMenuStory = {
  render: () => (
    <Box width="360px">
      <MainMenu />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
