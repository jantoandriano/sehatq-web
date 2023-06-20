import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  GeneralConsultationHCPInfo,
  GeneralConsultationHCPInfoProps,
} from "..";
export default {
  title: "Features / Telemedicine / Consultation HCP Info",
  component: GeneralConsultationHCPInfo,
} as Meta;

type GeneralConsultationHCPInfoStory =
  StoryObj<GeneralConsultationHCPInfoProps>;

export const Desktop: GeneralConsultationHCPInfoStory = {
  render: (args) => (
    <Box width="760px">
      <GeneralConsultationHCPInfo {...args} isMobile={false} />
    </Box>
  ),
};

export const Mobile: GeneralConsultationHCPInfoStory = {
  render: (args) => (
    <Box width="328px">
      <GeneralConsultationHCPInfo {...args} />
    </Box>
  ),
  args: { isMobile: true },
};
