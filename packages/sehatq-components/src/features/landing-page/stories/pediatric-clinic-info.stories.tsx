import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  PediatricClinicInfo,
  PediatricClinicInfoProps,
} from "../pediatric-clinic-info";

export default {
  title: "Features / Landing Page / Pediatric Clinic Info",
  component: PediatricClinicInfo,
} as Meta;

type PediatricClinicInfoStory = StoryObj<PediatricClinicInfoProps>;
export const Desktop: PediatricClinicInfoStory = {
  render: (args) => (
    <Box width="1106px">
      <PediatricClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: PediatricClinicInfoStory = {
  render: (args) => (
    <Box width="360px">
      <PediatricClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
