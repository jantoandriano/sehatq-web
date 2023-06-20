import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPList, TelemedicineHCPListProps } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP List",
  component: TelemedicineHCPList,
} as Meta;

type TelemedicineHCPListStory = StoryObj<TelemedicineHCPListProps>;

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

export const Desktop: TelemedicineHCPListStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineHCPList {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};

export const Mobile: TelemedicineHCPListStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineHCPList {...args} isMobile />
    </Box>
  ),
  args: { ...defaultArgs },
};
