import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { FamilyMemberMenu, FamilyMemberMenuProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Family MemberMenu",
  component: FamilyMemberMenu,
} as Meta;

type FamilyMemberMenuStory = StoryObj<FamilyMemberMenuProps>;

export const Desktop: FamilyMemberMenuStory = {
  render: (args) => (
    <Box overflowY="auto">
      <FamilyMemberMenu {...args} />
    </Box>
  ),
  args: {},
};

export const Mobile: FamilyMemberMenuStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
