import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { MyPrescriptions, MyPrescriptionsProps } from "..";

export default {
  title: "Features / My Prescription / My Prescriptions",
  component: MyPrescriptions,
} as Meta;

type MyPrescriptionsStory = StoryObj<MyPrescriptionsProps>;

export const Desktop: MyPrescriptionsStory = {
  render: (args) => (
    <Box width="722px">
      <MyPrescriptions {...args} />
    </Box>
  ),
  args: {
    statusFlag: "",
  },
};

export const Mobile: MyPrescriptionsStory = {
  render: (args) => (
    <Box width="328px">
      <MyPrescriptions {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
