import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  InternistClinicInfo,
  InternistClinicInfoProps,
} from "../internist-clinic-info";

export default {
  title: "Features / Landing Page / Internist Clinic Info",
  component: InternistClinicInfo,
} as Meta;

type InternistClinicInfoStory = StoryObj<InternistClinicInfoProps>;
export const Desktop: InternistClinicInfoStory = {
  render: (args) => (
    <Box width="1160px">
      <InternistClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};

export const Mobile: InternistClinicInfoStory = {
  render: (args) => (
    <Box width="360px">
      <InternistClinicInfo {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
