import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { ConsultationHistory, ConsultationHistoryProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation History",
  component: ConsultationHistory,
} as Meta;

type ConsultationHistoryStory = StoryObj<ConsultationHistoryProps>;

export const Desktop: ConsultationHistoryStory = {
  render: (args) => (
    <Flex direction="column" width="720px" minHeight="880px" background="white">
      <ConsultationHistory {...args} />
    </Flex>
  ),
  args: {
    consultationId: "13003",
  },
};

export const Mobile: ConsultationHistoryStory = {
  render: (args) => (
    <Flex direction="column" width="360px" minHeight="640px" background="white">
      <ConsultationHistory {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
