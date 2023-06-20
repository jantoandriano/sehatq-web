import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { formatDate } from "@sehatq/utils";

import { Box } from "../../../user-interfaces";
import {
  MyDoctorAppointmentInfoCard,
  MyDoctorAppointmentInfoCardProps,
} from "..";

export default {
  title: "Features / Booking / My Doctor Appointment Info Card",
  component: MyDoctorAppointmentInfoCard,
} as Meta;

type MyDoctorAppointmentInfoCardStory =
  StoryObj<MyDoctorAppointmentInfoCardProps>;

export const Desktop: MyDoctorAppointmentInfoCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyDoctorAppointmentInfoCard {...args} />
    </Box>
  ),
  args: {
    doctorImgSrc:
      "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/doctor_img/yulinda-indarnila-soemiatno-sp-m.jpg",
    bookingDate: formatDate(new Date("2021-01-06"), "d MMMM yyyy"),
    arrivalDate: formatDate(new Date("2021-01-21"), "d MMMM yyyy"),
    bookingTime: "16:00 - 19:30",
    bookingId: "BSQ2054",
    doctorName: "dr. Yulinda Indarnila Soemiatno, Sp.M",
    doctorSpeciality: "Mata",
    doctorSlug: "dr-shqlife-anak-qaqshq-spa",
    hospitalName: "RS Mata Nusantara Lebak Bulus (KMN)",
    hospitalAddress: "Ciputat, Tangerang Selatan",
    status: "checked-in",
  },
};

export const Mobile: MyDoctorAppointmentInfoCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyDoctorAppointmentInfoCard {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    ...Desktop.args,
  },
};
