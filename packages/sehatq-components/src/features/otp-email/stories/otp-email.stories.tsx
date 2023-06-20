import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { OTPEmailProps, OTPEmail } from "../otp-email";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / OTP / OTP Email",
  component: OTPEmail,
} as Meta;

type OTPEmailSectionStory = StoryObj<OTPEmailProps>;

const defaultArgs = {
  email: "akudankamu@spesial.com",
  initialResendOTPTimer: 60,
};

export const Desktop: OTPEmailSectionStory = {
  render: (args) => (
    <Box width="1366px">
      <OTPEmail {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    ...defaultArgs,
  },
};

export const Mobile: OTPEmailSectionStory = {
  render: (args) => (
    <Box width="360px">
      <OTPEmail {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    ...defaultArgs,
  },
};
