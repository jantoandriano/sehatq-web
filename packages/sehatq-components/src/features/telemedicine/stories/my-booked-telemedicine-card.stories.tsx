import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import { MyBookedTelemedicineCard, MyBookedTelemedicineCardProps } from "..";
export default {
  title: "Features / Telemedicine / My Booked Telemedicine Card",
  component: MyBookedTelemedicineCard,
} as Meta;

type MyBookedTelemedicineCardStory = StoryObj<MyBookedTelemedicineCardProps>;

const defaultArgs = {
  patientName: "Amelia Gadis Ardianti",
  createdAt: "11 Mei 2022",
  doctorName: "Woro Kurnianingrum, M.Psi",
  speciality: "Kulit & Kelamin",
  doctorImageUrl: "https://static.sehatq.com/telemed/profile/20210310071623",
  consultationId: "1",
  bookingStartDate: "Rabu, 12 Mei",
  bookingStartTime: "13.15 WIB",
};

export const Desktop: MyBookedTelemedicineCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyBookedTelemedicineCard {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    status: "start",
  },
};

export const Mobile: MyBookedTelemedicineCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyBookedTelemedicineCard {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
    status: "start",
  },
};
