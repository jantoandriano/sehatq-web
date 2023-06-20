import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FamilyMemberList, FamilyMemberListProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Family MemberList",
  component: FamilyMemberList,
} as Meta;

type FamilyMemberListStory = StoryObj<FamilyMemberListProps>;

export const Desktop: FamilyMemberListStory = {
  render: (args) => (
    <Box width="720px">
      <FamilyMemberList {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: FamilyMemberListStory = {
  render: (args) => (
    <Box width="328px">
      <FamilyMemberList {...args} isMobile />
    </Box>
  ),
  args: {},
};
