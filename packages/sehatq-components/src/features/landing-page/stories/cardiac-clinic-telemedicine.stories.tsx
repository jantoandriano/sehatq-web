import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  CardiacClinicTelemedicine,
  CardiacClinicTelemedicineProps,
} from "../cardiac-clinic-telemedicine";

export default {
  title: "Features / Landing Page / Cardiac Clinic Telemedicine",
  component: CardiacClinicTelemedicine,
} as Meta;

type CardiacClinicTelemedicineStory = StoryObj<CardiacClinicTelemedicineProps>;
export const Desktop: CardiacClinicTelemedicineStory = {
  render: (args) => (
    <Box width="1160px">
      <CardiacClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
  },
};
export const Mobile: CardiacClinicTelemedicineStory = {
  render: (args) => (
    <Box width="360px">
      <CardiacClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
