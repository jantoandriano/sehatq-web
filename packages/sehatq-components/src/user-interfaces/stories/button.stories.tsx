import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "..";

export default {
  title: "UI / Button",
  component: Button,
} as Meta;

type ButtonStory = StoryObj<ButtonProps>;

export const Basic: ButtonStory = {
  render: (args) => <Button {...args} />,
  args: {
    children: "Click Here",
    colorScheme: "blue",
    variant: "solid",
  },
};
