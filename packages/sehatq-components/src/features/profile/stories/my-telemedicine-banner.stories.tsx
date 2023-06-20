import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyTelemedicineBannerProps,
  MyTelemedicineBanner,
} from "../my-telemedicine-banner";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Telemedicine Banner",
  component: MyTelemedicineBanner,
} as Meta;

type MyTelemedicineBannerStory = StoryObj<MyTelemedicineBannerProps>;

export const Desktop: MyTelemedicineBannerStory = {
  render: (args) => (
    <Box width="240px" background="iceBlue.500" p={4}>
      <MyTelemedicineBanner {...args} />
    </Box>
  ),
  args: {
    startDate: "07 January 2022",
    doctorImgSrc:
      "https://static-dev.sehatq.com/telemed-dev/profile/202201061751099",
    doctorName: "prof. dr. Ironman, Sp.PD-KR",
    doctorSpeciality: "Dokter Spesialis Penyakit Dalam",
    id: 11581,
    isActive: false,
    myTelemedicineNavigation: { name: "TELEMED_PAID_CHATS" },
    statusLabel: "closed",
  },
};

export const Mobile: MyTelemedicineBannerStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
    isActive: true,
  },
};
