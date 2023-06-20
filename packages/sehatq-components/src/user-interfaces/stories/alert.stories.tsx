import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box, Alert, AlertProps } from "..";

export default {
  title: "UI / Alert",
  component: Alert,
} as Meta;

type AlertStory = StoryObj<AlertProps>;

export const Desktop: AlertStory = {
  render: (args) => (
    <Box width="760px">
      <Alert {...args}>
        Kamu tidak dapat memberikan rating dan review lebih dari 8 hari setelah
        waktu konsultasi.
      </Alert>
    </Box>
  ),
  args: {
    status: "warning",
  },
};

export const Mobile: AlertStory = {
  render: (args) => (
    <Box width="360px">
      <Alert {...args}>
        Kamu tidak dapat memberikan rating dan review lebih dari 8 hari setelah
        waktu konsultasi.
      </Alert>
    </Box>
  ),
  args: {
    ...Desktop.args,
    fontSize: "sm",
  },
};
