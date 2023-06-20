import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Code, CodeProps } from "..";

export default {
  title: "UI / Code",
  component: Code,
} as Meta;

type CodeStory = StoryObj<CodeProps>;

export const Basic: CodeStory = {
  render: (args) => <Code {...args} />,
  args: {
    children: "This is code",
    colorScheme: "blue",
    variant: "solid",
  },
};
