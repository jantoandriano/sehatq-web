import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicInfo,
  CardiacClinicInfoProps,
} from "../cardiac-clinic-info";

export default {
  title: "Features / Landing Page / Cardiac Clinic Info",
  component: CardiacClinicInfo,
} as Meta;

type CardiacClinicInfoStory = StoryObj<CardiacClinicInfoProps>;
export const Desktop: CardiacClinicInfoStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: CardiacClinicInfoStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
