import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { URLS } from "@sehatq/constants";
import { Box } from "../../../user-interfaces";
import { TelemedicineFilter, TelemedicineFilterProps } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine Filter",
  component: TelemedicineFilter,
} as Meta;

type TelemedicineFilterStory = StoryObj<TelemedicineFilterProps>;

const defaultArgs = {
  page: "1",
  perPage: "12",
  city: "",
  sortBy: "",
  userLat: "",
  userLong: "",
  query: "",
  campaignSlug: "capaign-azizah-cantik",
  doctorExperience: "",
  gender: "",
  price: "",
  specialitySlug: "",
  resetQuery: { slug: "capaign-azizah-cantik" },
  navigateName: "TELEMED_CAMPAIGN" as keyof typeof URLS,
};

export const Desktop: TelemedicineFilterStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineFilter {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineFilterStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineFilter {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
