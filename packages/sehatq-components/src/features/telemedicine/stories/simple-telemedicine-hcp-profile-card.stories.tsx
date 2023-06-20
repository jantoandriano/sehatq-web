import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  SimpleTelemedicineHCPProfileCard,
  SimpleTelemedicineHCPProfileCardProps,
  SimpleTelemedicineHCPProfileCardSkeleton,
} from "..";
export default {
  title: "Features / Telemedicine / Simple Telemedicine HCP Profile Card",
  component: SimpleTelemedicineHCPProfileCard,
} as Meta;

type SimpleTelemedicineHCPProfileCardStory =
  StoryObj<SimpleTelemedicineHCPProfileCardProps>;

export const Desktop: SimpleTelemedicineHCPProfileCardStory = {
  render: (args) => (
    <Box width="728px">
      <SimpleTelemedicineHCPProfileCard {...args} />
    </Box>
  ),
  args: { doctorSlug: "uci-pitra-ariesta-shinta-dewi" },
};

export const Mobile: SimpleTelemedicineHCPProfileCardStory = {
  render: (args) => (
    <Box width="328px">
      <SimpleTelemedicineHCPProfileCard {...args} isMobile />
    </Box>
  ),
  args: { doctorSlug: "uci-pitra-ariesta-shinta-dewi" },
};

export const SkeletonDesktop: SimpleTelemedicineHCPProfileCardStory = {
  render: () => (
    <Box width="728px">
      <SimpleTelemedicineHCPProfileCardSkeleton />
    </Box>
  ),
};

export const SkeletonMobile: SimpleTelemedicineHCPProfileCardStory = {
  render: () => (
    <Box width="328px">
      <SimpleTelemedicineHCPProfileCardSkeleton isMobile />
    </Box>
  ),
};
