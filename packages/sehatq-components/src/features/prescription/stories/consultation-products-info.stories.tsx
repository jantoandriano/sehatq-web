import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { ConsultationProductsInfo, ConsultationProductsInfoProps } from "..";

export default {
  title: "Features / Prescription / Consultation Products Info",
  component: ConsultationProductsInfo,
} as Meta;

type ConsultationProductsInfoStory = StoryObj<ConsultationProductsInfoProps>;

export const Desktop: ConsultationProductsInfoStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationProductsInfo {...args} />
    </Box>
  ),
  args: { consultationId: "15236" },
};

export const Mobile: ConsultationProductsInfoStory = {
  render: (args) => (
    <Box width="360px">
      <ConsultationProductsInfo {...args} />
    </Box>
  ),
  args: {
    consultationId: "15236",
    isMobile: true,
  },
};
