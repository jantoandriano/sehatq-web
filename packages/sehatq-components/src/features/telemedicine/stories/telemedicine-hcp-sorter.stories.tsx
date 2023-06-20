import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { TelemedicineHCPSorter, TelemedicineHCPSorterProps } from "..";
export default {
  title: "Features / Telemedicine / Telemedicine HCP Sorter",
  component: TelemedicineHCPSorter,
} as Meta;

type TelemedicineHCPSorterStory = StoryObj<TelemedicineHCPSorterProps>;

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

export const Desktop: TelemedicineHCPSorterStory = {
  render: (args) => (
    <Box width="760px">
      <TelemedicineHCPSorter {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
};
