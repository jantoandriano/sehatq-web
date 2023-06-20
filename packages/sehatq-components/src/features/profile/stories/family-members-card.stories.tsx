import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  FamilyMembersCardProps,
  FamilyMembersCard,
} from "../family-members-card";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / Family Members Card",
  component: FamilyMembersCard,
} as Meta;

type FamilyMembersCardStory = StoryObj<FamilyMembersCardProps>;

export const Desktop: FamilyMembersCardStory = {
  render: (args) => (
    <Box width="330px">
      <FamilyMembersCard {...args} />
    </Box>
  ),
  args: {
    title: "Anggota Keluarga",
    desc: "Lihat profil semua anggota keluargamu di sini.",
  },
};

export const Mobile: FamilyMembersCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
