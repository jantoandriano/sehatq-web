import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  MyHealthServiceAppointmentActions,
  MyHealthServiceAppointmentActionsProps,
} from "../";

export default {
  title: "Features / Profile / My Health Service Appointment Actions",
  component: MyHealthServiceAppointmentActions,
} as Meta;

type CancelationReasonsStory = StoryObj<MyHealthServiceAppointmentActionsProps>;

export const Desktop: CancelationReasonsStory = {
  render: (args) => (
    <Box width="500px">
      <MyHealthServiceAppointmentActions {...args} />
    </Box>
  ),
  args: {
    bookingId: "1231",
    statusCode: "done",
    serviceTypeSlug: "medical-check-up",
    bookHcfSlug: "rumah-sakit-eka-hospital-bsd",
    mutateCancelationReason: () => {
      console.log("cancel");
    },
  },
};

export const Mobile: CancelationReasonsStory = {
  render: (args) => (
    <Box width="360px">
      <MyHealthServiceAppointmentActions {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    statusCode: "new",
    isMobile: true,
  },
};
