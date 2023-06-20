import React from "react";
import { PartialDeep } from "type-fest";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { URLS } from "@sehatq/constants";
import { queryToString } from "@sehatq/utils";

import { Box } from "../../../user-interfaces";
import {
  TelemedicineHCPActions,
  TelemedicineHCPActionsProps,
  TelemedicineDoctorResponse,
} from "..";
import {
  generateGetTelemedicineHCP,
  generateFakeTelemedicineHCPResponse,
  submitConsultationCheckout,
  generateFakeSubmitConsultationCheckoutResponse,
} from "../msw-handlers";

export default {
  title: "Features / Telemedicine / Telemedicine HCP Actions",
  component: TelemedicineHCPActions,
} as Meta;

type TelemedicineHCPActionsStory = StoryObj<TelemedicineHCPActionsProps>;
const DOCTOR_SLUG = "syilfia-felisia";
const INDICATOR_GREEN = "green";
const INDICATOR_GREY = "grey";
const PRIVATE_CHANNEL = {
  id: 3,
  name: "Private",
  code: "ConsultationPrivate",
} as const;
const BOOKING_CHANNEL = {
  id: 4,
  name: "Booking",
  code: "ConsultationBooking",
} as const;

const previewData1: PartialDeep<TelemedicineDoctorResponse> = {
  data: {
    indicator: INDICATOR_GREEN,
    channels: [BOOKING_CHANNEL, PRIVATE_CHANNEL],
  },
};

const previewData2: PartialDeep<TelemedicineDoctorResponse> = {
  data: {
    indicator: INDICATOR_GREEN,
    channels: [PRIVATE_CHANNEL],
  },
};

const previewData3: PartialDeep<TelemedicineDoctorResponse> = {
  data: {
    indicator: INDICATOR_GREY,
    channels: [BOOKING_CHANNEL],
  },
};

const previewData4: PartialDeep<TelemedicineDoctorResponse> = {
  data: {
    indicator: INDICATOR_GREY,
    channels: [BOOKING_CHANNEL, PRIVATE_CHANNEL],
  },
};

async function expectBuatJadwalLink(
  elementScreen: ReturnType<typeof within>,
  slug: string
) {
  const buatJadwalLink = await elementScreen.findByRole("link", {
    name: "Buat Jadwal Chat",
  });
  expect(buatJadwalLink).toBeInTheDocument();
  expect(buatJadwalLink.getAttribute("href")).toEqual(
    `${URLS.TELEMED_HCP_SCHEDULES}${queryToString({
      slug,
    })}`
  );
}

async function expectMulaiChatButton(
  elementScreen: ReturnType<typeof within>,
  doctorId: number
) {
  const mulaiChatButton = await elementScreen.findByRole("button", {
    name: "Mulai Chat",
  });
  expect(mulaiChatButton).toBeInTheDocument();

  return async () => {
    userEvent.click(mulaiChatButton);
    const submitConsultationCheckoutVariables = {
      doctorId,
    };
    const {
      meta: { message },
    } = generateFakeSubmitConsultationCheckoutResponse(
      submitConsultationCheckoutVariables
    );
    const toastMessage = await screen.findByText(message);
    expect(toastMessage).toBeInTheDocument();
  };
}

function playUnitTest(skenario: string) {
  const query = { doctorId: DOCTOR_SLUG };
  switch (skenario) {
    case "1":
      return async () => {
        const response = generateFakeTelemedicineHCPResponse(
          query,
          previewData1
        );
        await expectBuatJadwalLink(screen, response.data.slug);
        await expectMulaiChatButton(screen, response.data.id);
      };
    case "2":
      return async () => {
        const response = generateFakeTelemedicineHCPResponse(
          query,
          previewData2
        );
        await expectMulaiChatButton(screen, response.data.id);
      };
    case "3":
      return async () => {
        const response = generateFakeTelemedicineHCPResponse(
          query,
          previewData3
        );
        await expectBuatJadwalLink(screen, response.data.slug);
      };
    case "4":
      return async () => {
        const response = generateFakeTelemedicineHCPResponse(
          query,
          previewData4
        );
        await expectBuatJadwalLink(screen, response.data.slug);
      };
    default:
      return undefined;
  }
}

export const DesktopGreenIndicatorWithPrivateBookingChannel: TelemedicineHCPActionsStory =
  {
    render: (args) => (
      <Box width="328px">
        <TelemedicineHCPActions {...args} />
      </Box>
    ),
    args: {
      doctorSlug: DOCTOR_SLUG,
    },
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData1),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("1"),
  };

export const DesktopGreenIndicatorWithPrivateChannel: TelemedicineHCPActionsStory =
  {
    ...DesktopGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData2),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("2"),
  };

export const DesktopGreyIndicatorWithPrivateBookingChannel: TelemedicineHCPActionsStory =
  {
    ...DesktopGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData3),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("3"),
  };

export const DesktopGreyIndicatorWithBookingChannel: TelemedicineHCPActionsStory =
  {
    ...DesktopGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData4),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("4"),
  };

export const MobileGreenIndicatorWithPrivateBookingChannel: TelemedicineHCPActionsStory =
  {
    render: (args) => (
      <Box width="360px">
        <TelemedicineHCPActions {...args} />
      </Box>
    ),
    args: {
      doctorSlug: DOCTOR_SLUG,
      isMobile: true,
    },
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData1),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("1"),
  };

export const MobileGreenIndicatorWithPrivateChannel: TelemedicineHCPActionsStory =
  {
    ...MobileGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData2),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("2"),
  };

export const MobileGreyIndicatorWithPrivateBookingChannel: TelemedicineHCPActionsStory =
  {
    ...MobileGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData3),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("3"),
  };

export const MobileGreyIndicatorWithBookingChannel: TelemedicineHCPActionsStory =
  {
    ...MobileGreenIndicatorWithPrivateBookingChannel,
    parameters: {
      msw: {
        handlers: [
          generateGetTelemedicineHCP(previewData4),
          submitConsultationCheckout,
        ],
      },
    },
    play: playUnitTest("4"),
  };
