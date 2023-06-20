import React from "react";
import { PartialDeep } from "type-fest";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionStatusCard,
  PrescriptionStatusCardProps,
  PrescriptionResponse,
  PrescriptionStatusCode,
} from "..";
import {
  generateGetPrescriptionRequest,
  generateFakePrescriptionRequestResponse,
} from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Status Card",
  component: PrescriptionStatusCard,
} as Meta;

type PrescriptionStatusCardStory = StoryObj<PrescriptionStatusCardProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

const previewCase1: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "created",
      name: "Resep Baru",
      activityMessage: "Dokter sudah memberikan resep untukmu",
    },
  },
};

const previewCase2: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "requested",
      name: "Diproses",
      activityMessage: "Resepmu sedang kami proses.",
    },
  },
};

const previewCase3: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "approved",
      name: "Siap Ditebus",
      activityMessage: "Obat sudah tersedia. Yuk, tebus obatmu.",
    },
  },
};

const previewCase4: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "purchased",
      name: "Ditebus",
      activityMessage: "Resepmu sudah ditebus. Cepat sembuh ya!",
    },
  },
};

const previewCase5: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "request_expired",
      name: "Gagal Diproses",
      activityMessage: "Tenang, coba tebus ulang resepmu ya.",
    },
  },
};

const previewCase6: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "expired",
      name: "Kedaluwarsa",
      activityMessage: "Kamu bisa chat dokter untuk resep baru.",
    },
  },
};

const previewCase7: PartialDeep<PrescriptionResponse> = {
  data: {
    status: {
      id: "cancelled",
      name: "Batal",
      activityMessage: "Resepmu sudah dibatalkan.",
    },
  },
};

function playUnitTest(status: PrescriptionStatusCode) {
  const query = { prescriptionNo: PRESCRIPTION_NO };
  switch (status) {
    case "created":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase1
        );
        console.log(response);
      };
    case "requested":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase2
        );
        console.log(response);
      };
    case "approved":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase3
        );
        console.log(response);
      };
    case "purchased":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase4
        );
        console.log(response);
      };
    case "request_expired":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase5
        );
        console.log(response);
      };
    case "expired":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase6
        );
        console.log(response);
      };
    case "cancelled":
      return async () => {
        const response = generateFakePrescriptionRequestResponse(
          query,
          previewCase7
        );
        console.log(response);
      };
    default:
      return undefined;
  }
}

export const DesktopWithCreatedStatus: PrescriptionStatusCardStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionStatusCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: "PR2208EKCXOFN",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase1)],
    },
  },
  play: playUnitTest("created"),
};

export const DesktopWithRequestedStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LC",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase2)],
    },
  },
  play: playUnitTest("requested"),
};

export const DesktopWithApprovedStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LD",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase3)],
    },
  },
  play: playUnitTest("approved"),
};

export const DesktopWithPurchasedStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5KD",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase4)],
    },
  },
  play: playUnitTest("purchased"),
};

export const DesktopWithRequestExpiredStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LE",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase5)],
    },
  },
  play: playUnitTest("request_expired"),
};

export const DesktopWithExpiredStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LF",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase6)],
    },
  },
  play: playUnitTest("expired"),
};

export const DesktopWithCancelledStatus: PrescriptionStatusCardStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LG",
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase7)],
    },
  },
  play: playUnitTest("cancelled"),
};

export const MobileWithCreatedStatus: PrescriptionStatusCardStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionStatusCard {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: "PR2206VKAS5LH",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase1)],
    },
  },
  play: playUnitTest("created"),
};

export const MobileWithRequestedStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LI",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase2)],
    },
  },
  play: playUnitTest("requested"),
};

export const MobileWithApprovedStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LJ",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase3)],
    },
  },
  play: playUnitTest("approved"),
};

export const MobileWithPurchasedStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LK",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase4)],
    },
  },
  play: playUnitTest("purchased"),
};

export const MobileWithRequestExpiredStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LL",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase5)],
    },
  },
  play: playUnitTest("request_expired"),
};

export const MobileWithExpiredStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LM",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase6)],
    },
  },
  play: playUnitTest("expired"),
};

export const MobileWithCancelledStatus: PrescriptionStatusCardStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2206VKAS5LN",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase7)],
    },
  },
  play: playUnitTest("cancelled"),
};
