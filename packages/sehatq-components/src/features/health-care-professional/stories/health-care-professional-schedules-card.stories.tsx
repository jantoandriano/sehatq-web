import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { HCPSchedulesCard, HCPSchedulesCardProps } from "..";

export default {
  title:
    "Features / Health Care Professional / Health Care Professional Schedules Card",
  component: HCPSchedulesCard,
} as Meta;

type HCPSchedulesCardStory = StoryObj<HCPSchedulesCardProps>;

const defaultArgs = {
  hcpId: 7240,
  hcpSlug: "dr-rio-andreas-spb",
  hcfId: 2072,
  hcfName: "RS Harapan Sehati",
  hcfAddress: "Bojonggede, Bogor",
  hcfDistance: 10,
  hcfLatitude: -6.48086849530168,
  hcfLongitude: 106.805229368299,
  hcfImageUrl:
    "https://cms.sehatq.com/public/img/hospital_thumb/harapan-sehati-bogor-HCFH00000439.jpg",
  hcfImageAlt: "RS Harapan Sehati di Bogor",
  hcfPartner: 2,
  procedures: [
    "Bedah Jantung",
    "Bedah Anak",
    "Sirkumsisi",
    "Endoskopi",
    "USG anak perempuan",
    "Urologi",
    "Obgin",
    "Mata",
    "Veneer Gigi",
    "Bedah Plastik",
  ],
  bookingOnline: 1,
  phone: "(021) 87972380",
  isCollapse: true,
  onCollapseToggle: (hcfId: number, hcpId: number) => console.log(hcfId, hcpId),
  onScheduleClick: (schedule?: {
    hcpId: number;
    hcfId: number;
    date: string;
    time: string;
    bookingOnline: number;
    refHcp: string;
  }) => console.log(schedule),
  selectedSchedule: {
    hcpId: 7240,
    hcfId: 2072,
    date: "Kamis, 19 Mei 2022",
    time: "08:00 - 10:00",
    bookingOnline: 1,
    refHcp: "dr-rio-andreas-spb",
  },
};

export const Mobile: HCPSchedulesCardStory = {
  render: (args) => (
    <Box width="328px">
      <HCPSchedulesCard {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Desktop: HCPSchedulesCardStory = {
  render: (args) => (
    <Box width="760px">
      <HCPSchedulesCard {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};
