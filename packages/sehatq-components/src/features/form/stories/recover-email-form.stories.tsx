import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { RecoverEmailForm, RecoverEmailFormProps } from "../recover-email-form";

export default {
  title: "Features / Form / Recovery Email",
  component: RecoverEmailForm,
} as Meta;

type RecoveryEmailFormStory = StoryObj<RecoverEmailFormProps>;

export const Mobile: RecoveryEmailFormStory = {
  render: (args) => (
    <Box width="360px">
      <RecoverEmailForm {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};

export const Desktop: RecoveryEmailFormStory = {
  render: (args) => (
    <Box width="1366px">
      <RecoverEmailForm {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};
