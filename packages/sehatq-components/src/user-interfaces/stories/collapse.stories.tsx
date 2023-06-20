import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Collapse, CollapseProps } from "..";

export default {
  title: "UI / Collapse",
  component: Collapse,
} as Meta;

type CollapseStory = StoryObj<CollapseProps>;

export const Basic: CollapseStory = {
  render: (args) => <Collapse {...args} />,
  args: {
    children: "content children",
    in: true,
  },
};
