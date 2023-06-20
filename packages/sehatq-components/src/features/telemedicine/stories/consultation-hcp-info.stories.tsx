import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { ConsultationHCPInfo, ConsultationHCPInfoProps } from "..";
export default {
  title: "Features / Telemedicine / Consultation HCP Info",
  component: ConsultationHCPInfo,
} as Meta;

type ConsultationHCPInfoStory = StoryObj<ConsultationHCPInfoProps>;

export const Desktop: ConsultationHCPInfoStory = {
  render: (args) => (
    <Box width="760px">
      <ConsultationHCPInfo {...args} isMobile={false} />
    </Box>
  ),
  args: { consultationId: 13260 },
};

export const Mobile: ConsultationHCPInfoStory = {
  render: (args) => (
    <Box width="328px">
      <ConsultationHCPInfo {...args} isMobile />
    </Box>
  ),
  args: { consultationId: 13260 },
};
