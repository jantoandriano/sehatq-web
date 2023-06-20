import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { LoginPopup, LoginPopupProps } from "..";

export default {
  title: "Features / General / Login Popup",
  component: LoginPopup,
} as Meta;

type LoginPopupStory = StoryObj<LoginPopupProps>;

export const Desktop: LoginPopupStory = {
  render: (args) => (
    <Box width="760px">
      <LoginPopup {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: LoginPopupStory = {
  render: (args) => {
    return (
      <Box width="360px">
        <LoginPopup {...args} />
      </Box>
    );
  },
  args: {
    isMobile: true,
  },
};
