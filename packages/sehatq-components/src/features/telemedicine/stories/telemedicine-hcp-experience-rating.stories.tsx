import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import {
  TelemedicineHCPExperienceRating,
  TelemedicineHCPExperienceRatingProps,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine Hcp Experience Rating",
  component: TelemedicineHCPExperienceRating,
} as Meta;

type TelemedicineHCPExperienceRatingStory =
  StoryObj<TelemedicineHCPExperienceRatingProps>;

export const Desktop: TelemedicineHCPExperienceRatingStory = {
  render: (args) => (
    <Flex
      boxShadow="sm"
      borderRadius="2xl"
      py="40px"
      justify="space-evenly"
      width="376px"
    >
      <TelemedicineHCPExperienceRating {...args} />
    </Flex>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
  },
};

export const Mobile: TelemedicineHCPExperienceRatingStory = {
  render: (args) => (
    <Flex
      boxShadow="xs"
      borderRadius="base"
      py={3}
      justify="space-evenly"
      width="360px"
    >
      <TelemedicineHCPExperienceRating {...args} />
    </Flex>
  ),
  args: {
    doctorSlug: "uci-pitra-ariesta-shinta-dewi",
    isMobile: true,
  },
};
