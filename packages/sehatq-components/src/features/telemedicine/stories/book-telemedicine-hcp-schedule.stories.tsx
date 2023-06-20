import React from "react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  BookTelemedicineHCPSchedule,
  BookTelemedicineHCPScheduleProps,
} from "..";
import {
  generateFakeSubmitConsultationCheckoutResponse,
  submitConsultationCheckout,
} from "../msw-handlers";
import { getProfile } from "../../profile/msw-handlers";

export default {
  title: "Features / Telemedicine / Book Telemedicine HCP Schedule ",
  component: BookTelemedicineHCPSchedule,
  parameters: {
    msw: {
      handlers: [getProfile, submitConsultationCheckout],
    },
  },
} as Meta;

type BookTelemedicineHCPScheduleStory =
  StoryObj<BookTelemedicineHCPScheduleProps>;

async function expectLanjutkanButton(
  elementScreen: ReturnType<typeof within>,
  doctorId: number,
  booking: {
    doctorScheduleId: string;
    bookingDate: string;
  }
) {
  const lanjutkanButton = await elementScreen.findByRole("button", {
    name: "Lanjutkan",
  });
  expect(lanjutkanButton).toBeInTheDocument();

  userEvent.click(lanjutkanButton);
  const submitConsultationCheckoutVariables = {
    doctorId,
    booking: {
      doctorScheduleId: Number(booking.doctorScheduleId),
      bookingDate: booking.bookingDate,
    },
  };
  const {
    meta: { message },
  } = generateFakeSubmitConsultationCheckoutResponse(
    submitConsultationCheckoutVariables
  );
  const toastMessage = await screen.findByText(message);
  expect(toastMessage).toBeInTheDocument();
}

function playUnitTest() {
  return async () => {
    await expectLanjutkanButton(screen, 1732, {
      doctorScheduleId: "3388",
      bookingDate: "2022-08-25",
    });
  };
}

export const Desktop: BookTelemedicineHCPScheduleStory = {
  render: (args) => (
    <Box bgColor="white" width="760px" p={4}>
      <BookTelemedicineHCPSchedule {...args} />
    </Box>
  ),
  args: {
    doctorId: 1732,
    doctorScheduleId: "3388",
    bookingDate: "2022-08-25",
  },
  play: playUnitTest(),
};

export const Mobile: BookTelemedicineHCPScheduleStory = {
  render: (args) => (
    <Box bgColor="white" width="360px" p={4}>
      <BookTelemedicineHCPSchedule {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
  play: playUnitTest(),
};
