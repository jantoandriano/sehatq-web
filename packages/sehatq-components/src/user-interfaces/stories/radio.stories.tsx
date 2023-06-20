import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioProps, Box, RadioGroup, RadioGroupProps } from "..";
import { TickIcon } from "../icons";
import { StackDivider } from "../stack";

export default {
  title: "UI / Radio",
  component: Radio,
} as Meta;

type RadioStory = StoryObj<RadioProps>;

export const Basic: RadioStory = {
  render: (args) => (
    <Box w="200px">
      <Radio {...args} />
    </Box>
  ),
  args: {
    children: "Radio 1",
  },
};

type RadioGroupStory = StoryObj<RadioGroupProps>;

export const Group: RadioGroupStory = {
  render: (args) => (
    <Box w="400px">
      <Box>Group 1</Box>
      <RadioGroup {...args} isRadioInline={true} spacing={3} />
      <Box>Group 2</Box>
      <RadioGroup
        spacing="3"
        {...args}
        name="Group-2"
        iconPosition="right"
        direction="column"
        divider={<StackDivider borderColor="veryLightPink" />}
      />
    </Box>
  ),
  args: {
    options: [
      {
        element: <Box>test</Box>,
        value: "test",
      },
      {
        element: "test 1",
        value: "test 1",
      },
    ],
    name: "Group-1",
    onChange: console.log,
    defaultValue: "test",
    IconFill: TickIcon,
  },
};
