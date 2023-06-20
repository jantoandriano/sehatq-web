import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Flex } from "../../../user-interfaces";
import {
  TelemedicineHCPSchedules,
  TelemedicineHCPSchedulesProps,
  TelemedicineHCPSchedulesSkeleton,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine HCP Schedules ",
  component: TelemedicineHCPSchedules,
} as Meta;

type TelemedicineHCPSchedulesStory = StoryObj<TelemedicineHCPSchedulesProps>;

export const Desktop: TelemedicineHCPSchedulesStory = {
  render: (args) => (
    <Flex direction="column" width="760px">
      <TelemedicineHCPSchedules {...args} />
    </Flex>
  ),
  args: {
    doctorId: 1732,
    setDoctorScheduleId: () => console.log("asd"),
    setBookingDate: () => console.log("qwe"),
  },
};

export const SkeletonDesktop: TelemedicineHCPSchedulesStory = {
  render: () => (
    <Flex direction="column" width="760px">
      <TelemedicineHCPSchedulesSkeleton />
    </Flex>
  ),
};

export const Mobile: TelemedicineHCPSchedulesStory = {
  render: (args) => (
    <Flex direction="column" width="360px">
      <TelemedicineHCPSchedules {...args} isMobile />
    </Flex>
  ),
  args: {
    isMobile: true,
    doctorId: 1732,
    setDoctorScheduleId: () => console.log("asd"),
    setBookingDate: () => console.log("qwe"),
  },
};

export const SkeletonMobile: TelemedicineHCPSchedulesStory = {
  render: () => (
    <Flex direction="column" width="360px">
      <TelemedicineHCPSchedulesSkeleton isMobile />
    </Flex>
  ),
};
