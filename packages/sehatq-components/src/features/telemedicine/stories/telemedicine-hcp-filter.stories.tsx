import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPFilter, TelemedicineHCPFilterProps } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Filter",
  component: TelemedicineHCPFilter,
} as Meta;

type TelemedicineHCPFilterStory = StoryObj<TelemedicineHCPFilterProps>;

const defaultArgs = {
  page: "1",
  perPage: "12",
  city: "",
  sortBy: "",
  userLat: "",
  userLong: "",
  query: "",
  campaignSlug: "",
  doctorExperience: "",
  gender: "",
  price: "",
  specialitySlug: "",
};

export const Desktop: TelemedicineHCPFilterStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineHCPFilter {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineHCPFilterStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineHCPFilter {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
