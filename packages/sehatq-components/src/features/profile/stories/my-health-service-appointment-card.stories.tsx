import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyHealthServiceAppointmentCardProps,
  MyHealthServiceAppointmentCardSkeleton,
  MyHealthServiceAppointmentCard,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Health Service Appointment Card",
  component: MyHealthServiceAppointmentCard,
} as Meta;

type MyHealthServiceAppointmentCardStory =
  StoryObj<MyHealthServiceAppointmentCardProps>;

export const Desktop: MyHealthServiceAppointmentCardStory = {
  render: (args) => (
    <Box width="760px" p={5} background="iceBlue.500">
      <MyHealthServiceAppointmentCard {...args} />
    </Box>
  ),
  args: {
    id: 1,
    bookCreateDate: "03 Okt, 13.15",
    statusCode: "new",
    bookDate: "12 Desember 2020",
    bookId: "PRQ0001",
    serviceName: "Medical Check Up - Paket Platinum",
    serviceType: "Medical Check Up",
    serviceTypeSlug: "medical-check-up",
    servicePrice: "Rp 925.000",
    patientName: "Nicole Rania",
    bookHcfName: "Eka Hospital BSD",
    bookHcfSlug: "rumah-sakit-eka-hospital-bsd",
    bookTime: "09.00 - 12.00",
    mutateCancelationReason: () => {
      console.log("cancel");
    },
    userId: "1231",
  },
};

export const Mobile: MyHealthServiceAppointmentCardStory = {
  render: (args) => (
    <Box width="360px" p={4} background="iceBlue.500">
      <MyHealthServiceAppointmentCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const SkeletonDesktop: MyHealthServiceAppointmentCardStory = {
  render: () => (
    <Box width="760px" p={5} background="iceBlue.500">
      <MyHealthServiceAppointmentCardSkeleton isMobile={false} />
    </Box>
  ),
};

export const SkeletonMobile: MyHealthServiceAppointmentCardStory = {
  render: () => (
    <Box width="360px" p={4} background="iceBlue.500">
      <MyHealthServiceAppointmentCardSkeleton isMobile={true} />
    </Box>
  ),
};
