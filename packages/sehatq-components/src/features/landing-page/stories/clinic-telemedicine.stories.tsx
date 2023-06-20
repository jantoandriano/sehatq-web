import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  ClinicTelemedicine,
  ClinicTelemedicineProps,
} from "../clinic-telemedicine";

export default {
  title: "Features / Landing Page / Clinic Telemedicine",
  component: ClinicTelemedicine,
} as Meta;

type ClinicTelemedicineStory = StoryObj<ClinicTelemedicineProps>;
export const Desktop: ClinicTelemedicineStory = {
  render: (args) => (
    <Box width="1160px">
      <ClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    title: "Si Kecil Sakit? Chat Dokter Sekarang",
    telemedicinesNavigation: {
      name: "TELEMED_HCPS",
      query: {
        slugs: ["anak"],
      },
    },
    specialitySlug: "",
  },
};

export const Mobile: ClinicTelemedicineStory = {
  render: (args) => (
    <Box width="328px">
      <ClinicTelemedicine {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    title: "Si Kecil Sakit? Chat Dokter Sekarang",
    specialitySlug: "",
  },
};
