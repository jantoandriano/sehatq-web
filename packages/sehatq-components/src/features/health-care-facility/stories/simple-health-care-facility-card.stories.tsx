import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  SimpleHealthCareFacilityCardProps,
  SimpleHealthCareFacilityCard,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Care Facility / Simple Health Care Facility Card",
  component: SimpleHealthCareFacilityCard,
} as Meta;

type SimpleHealthCareFacilityCardStory =
  StoryObj<SimpleHealthCareFacilityCardProps>;

export const Desktop: SimpleHealthCareFacilityCardStory = {
  render: (args) => (
    <Box width="144px">
      <SimpleHealthCareFacilityCard {...args} />
    </Box>
  ),
  args: {
    hcfName: "Bintaro Woman Children Clinic Jagakarsa",
    imageUrl:
      "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/hospital_thumb/yua-medical-HCFC00001553.jpg",
    slug: "klinik-kulit-kecantikan-yua-medical-aesthetic-clinic",
    partner: 2,
    hcfType: "Klinik Kulit & Kecantikan",
    district: "Kembangan",
    city: "Jakarta Barat",
  },
};

export const Mobile: SimpleHealthCareFacilityCardStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
