import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { Consultation, ConsultationProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation ",
  component: Consultation,
} as Meta;

type ConsultationStory = StoryObj<ConsultationProps>;

export const Desktop: ConsultationStory = {
  render: (args) => (
    <Flex direction="column" width="720px" minHeight="880px" background="white">
      <Consultation {...args} />
    </Flex>
  ),
  args: {
    consultationId: "13003",
  },
};

export const Mobile: ConsultationStory = {
  render: (args) => (
    <Flex direction="column" width="360px" minHeight="640px" background="white">
      <Consultation {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
