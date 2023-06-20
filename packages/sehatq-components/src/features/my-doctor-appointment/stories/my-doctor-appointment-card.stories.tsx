import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { formatDate } from "@sehatq/utils";
import { Box, Stack } from "../../../user-interfaces";
import {
  MyDoctorAppointmentCard,
  MyDoctorAppointmentCardProps,
  MyDoctorAppointmentCardSkeleton,
} from "..";

export default {
  title: "Features / Booking / My Doctor Appointment Card",
  component: MyDoctorAppointmentCard,
  subcomponents: { MyDoctorAppointmentCardSkeleton },
} as Meta;

type MyDoctorAppointmentCardStory = StoryObj<MyDoctorAppointmentCardProps>;

export const Mobile: MyDoctorAppointmentCardStory = {
  render: (args) => (
    <Box width="328px">
      <Stack spacing="2.5">
        <MyDoctorAppointmentCard {...args} isMobile />
        <MyDoctorAppointmentCardSkeleton isMobile />
      </Stack>
    </Box>
  ),
  args: {
    doctorImgSrc:
      "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/doctor_img/yulinda-indarnila-soemiatno-sp-m.jpg",
    createdDate: formatDate(
      new Date("2020-12-29 12:00:44"),
      "d MMM yyyy, HH:mm 'WIB'"
    ),
    bookingDate: formatDate(new Date("2021-01-06"), "d MMMM yyyy"),
    bookingTime: "16:00 - 19:30",
    bookingIdLabel: "BSQ2054",
    bookingId: "BSQ2054",
    doctorName: "dr. Yulinda Indarnila Soemiatno, Sp.M",
    doctorSpeciality: "Mata",
    patientName: "Thor - Avengers",
    hospitalName: "RS Mata Nusantara Lebak Bulus (KMN)",
    status: "attended",
    doctorNavigation: {
      name: "HEALTH_CARE_PROFESIONAL",
      query: { slugs: ["something123"] },
    },
    mutateCancelationReason: () => {
      console.log("cancel");
    },
  },
};

export const Desktop: MyDoctorAppointmentCardStory = {
  render: (args) => (
    <Box width="720px">
      <Stack spacing="2.5">
        <MyDoctorAppointmentCard {...args} />
        <MyDoctorAppointmentCardSkeleton />
      </Stack>
    </Box>
  ),
  args: {
    doctorImgSrc:
      "https://cms-dev.sehatq.com/cdn-cgi/image/f=auto/public/img/doctor_img/yulinda-indarnila-soemiatno-sp-m.jpg",
    createdDate: formatDate(
      new Date("2020-12-29 12:00:44"),
      "d MMM yyyy, HH:mm 'WIB'"
    ),
    bookingDate: formatDate(new Date("2021-01-06"), "d MMMM yyyy"),
    bookingTime: "16:00 - 19:30",
    bookingIdLabel: "BSQ2054",
    bookingId: "BSQ2054",
    doctorName: "dr. Yulinda Indarnila Soemiatno, Sp.M",
    doctorSpeciality: "Mata",
    patientName: "Thor - Avengers",
    hospitalName: "RS Mata Nusantara Lebak Bulus (KMN)",
    status: "attended",
    doctorNavigation: {
      name: "HEALTH_CARE_PROFESIONAL",
      query: { slugs: ["something123"] },
    },
    mutateCancelationReason: () => {
      console.log("cancel");
    },
  },
};
