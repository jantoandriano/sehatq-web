import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  FamilyMemberSlider,
  FamilyMemberSliderProps,
  FamilyMembersProps,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Family Member Slider",
  component: FamilyMemberSlider,
} as Meta;

type FamilyMemberSliderStory = StoryObj<FamilyMemberSliderProps>;

export const Desktop: FamilyMemberSliderStory = {
  render: (args) => (
    <Box width="760px">
      <FamilyMemberSlider {...args} />
    </Box>
  ),
  args: {
    userId: "11355",
    onChangeProfile: (value: FamilyMembersProps) => console.log(value),
  },
};

export const Mobile: FamilyMemberSliderStory = {
  render: (args) => (
    <Box width="360px">
      <FamilyMemberSlider {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
