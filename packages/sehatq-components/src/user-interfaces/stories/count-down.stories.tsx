import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { CountDown, CountDownProps } from "..";

export default {
  title: "UI / Count Down",
  component: CountDown,
} as Meta;

type CountDownStory = StoryObj<CountDownProps>;

export const Basic: CountDownStory = {
  render: (args) => <CountDown {...args} />,
  args: {
    background: "blue.500",
    width: "100px",
    height: "100px",
    borderRadius: 4,
    startCount: 3600,
  },
};
