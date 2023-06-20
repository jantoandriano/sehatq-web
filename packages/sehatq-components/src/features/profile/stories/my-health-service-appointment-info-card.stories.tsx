import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  MyHealthServiceAppointmentInfoCard,
  MyHealthServiceAppointmentInfoCardProps,
  MyHealthServiceAppointmentInfoCardSkeleton,
} from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Health Service Appointment Info Card",
  component: MyHealthServiceAppointmentInfoCard,
} as Meta;

type MyHealthServiceAppointmentInfoCardStory =
  StoryObj<MyHealthServiceAppointmentInfoCardProps>;

export const Desktop: MyHealthServiceAppointmentInfoCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyHealthServiceAppointmentInfoCard {...args} />
    </Box>
  ),
  args: {
    bookingId: "PRQ0001",
    packageName: "PCR Test - Paket Keluarga",
    procedureName: "Covid-19",
    createdAt: "1 Januari 2021",
    scheduleDate: "21 Januari 2021",
    scheduleTime: "19.00 - 21.00",
    hcfName: "Eka Hospital BSD",
    price: "Rp 925.000",
  },
};

export const Mobile: MyHealthServiceAppointmentInfoCardStory = {
  render: (args) => (
    <Box width="328px">
      <MyHealthServiceAppointmentInfoCard {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};

export const Skeleton: MyHealthServiceAppointmentInfoCardStory = {
  render: (args) => (
    <Box width="720px">
      <MyHealthServiceAppointmentInfoCardSkeleton {...args} />
    </Box>
  ),
  args: { isMobile: false },
};
