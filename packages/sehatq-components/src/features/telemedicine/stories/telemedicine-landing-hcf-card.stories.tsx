import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  TelemedicineLandingHCFCard,
  TelemedicineLandingHCFCardProps,
} from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Landing HCF Card",
  component: TelemedicineLandingHCFCard,
} as Meta;

type TelemedicineLandingHCFCardStory =
  StoryObj<TelemedicineLandingHCFCardProps>;

const defaultArgs = {
  name: "Medika Stannia",
  logoUrl:
    "https://static-dev.sehatq.com/telemed-dev/hospital_logo/20210419141842",
  slug: "ztest-sehatq-test-5",
};

export const Desktop: TelemedicineLandingHCFCardStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineLandingHCFCard {...args} isMobile={false} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineLandingHCFCardStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineLandingHCFCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
