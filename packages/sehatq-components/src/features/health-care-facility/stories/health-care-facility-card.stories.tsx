import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { HealthCareFacilityCard, HealthCareFacilityCardProps } from "..";

export default {
  title: "Features / Health Care Facility / Health Care Facility Card",
  component: HealthCareFacilityCard,
} as Meta;

type HealthCareFacilityCardStory = StoryObj<HealthCareFacilityCardProps>;

const defaultArgs = {
  imageUrl:
    "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/harapan-sehati-bogor-HCFH00000439.jpg",
  hcfSlug: "rumah-sakit-harapan-sehati",
  hcfName: "RS Harapan Sehati",
  hcfType: "C",
  isPartner: true,
  isEmergency: true,
  distance: 0.72,
  openTime: "Senin -  Minggu 00:00 - 23:59",
  district: "Bojonggede",
  city: "Bogor",
  rating: 4,
};

export const Desktop: HealthCareFacilityCardStory = {
  render: (args) => (
    <Box width="760px">
      <HealthCareFacilityCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};

export const Mobile: HealthCareFacilityCardStory = {
  render: (args) => (
    <Box width="328px">
      <HealthCareFacilityCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
};
