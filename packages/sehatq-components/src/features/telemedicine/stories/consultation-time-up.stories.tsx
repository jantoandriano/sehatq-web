import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ConsultationTimeUp, ConsultationTimeUpProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation Time Up",
  component: ConsultationTimeUp,
} as Meta;

type ConsultationTimeUpStory = StoryObj<ConsultationTimeUpProps>;

export const Desktop: ConsultationTimeUpStory = {
  render: (args) => (
    <Box width="777px">
      <ConsultationTimeUp {...args} />
    </Box>
  ),
  args: {
    isOpenTimeUp: true,
    onCloseTimeUp: () => console.log("call onCloseTimeUp"),
  },
};

export const Mobile: ConsultationTimeUpStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <ConsultationTimeUp {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
