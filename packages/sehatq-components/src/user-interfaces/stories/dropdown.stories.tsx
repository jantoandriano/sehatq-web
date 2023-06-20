import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Dropdown, DropdownProps } from "..";

export default {
  title: "UI / Dropdown",
  component: Dropdown,
} as Meta;

type DropdownStory = StoryObj<DropdownProps>;

export const Desktop: DropdownStory = {
  render: (args) => <Dropdown {...args} />,
  args: {
    isMobile: false,
    options: [
      {
        value: "m",
        label: "Pria",
      },
      {
        value: "f",
        label: "Wanita",
      },
    ],
    placeholder: "Jenis Kelamin",
    value: "m",
    onChange: console.log,
  },
};

export const Mobile: DropdownStory = {
  render: (args) => (
    <Box width="328px">
      <Dropdown {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
