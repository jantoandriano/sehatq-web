import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { StartConsultation, StartConsultationProps } from "..";

export default {
  title: "Features / General / Start Consultation",
  component: StartConsultation,
} as Meta;

type StartConsultationStory = StoryObj<StartConsultationProps>;

export const Desktop: StartConsultationStory = {
  render: (args) => (
    <Flex width="760px" justifyContent="center">
      <StartConsultation {...args} />
    </Flex>
  ),
  args: {
    doctorId: 1732,
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
    indicator: "grey",
  },
};

export const Mobile: StartConsultationStory = {
  render: (args) => (
    <Flex width="328px" justifyContent="end">
      <StartConsultation {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
