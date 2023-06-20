import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { PartialDeep } from "type-fest";

import { Box } from "../../../user-interfaces";
import {
  PrescriptionStatusLogPopup,
  PrescriptionStatusLogPopupProps,
  PrescriptionHistoryResponse,
  PRESCRIPTION_STATUS,
} from "..";
import {
  generateGetPrescriptionRequest,
  generateGetPrescriptionHistoryRequest,
} from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Status Log Popup",
  component: PrescriptionStatusLogPopup,
} as Meta;

type PrescriptionStatusLogPopupStory =
  StoryObj<PrescriptionStatusLogPopupProps>;

const previewCase1: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["created"].id,
      name: PRESCRIPTION_STATUS["created"].name,
      activityMessage: "Dokter sudah memberikan resep untukmu",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-08-17T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase2: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["requested"].id,
      name: PRESCRIPTION_STATUS["requested"].name,
      activityMessage: "Resepmu sedang kami proses.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-08-19T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-08-18T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase3: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["approved"].id,
      name: PRESCRIPTION_STATUS["approved"].name,
      activityMessage: "Obat sudah tersedia. Yuk, tebus obatmu.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["approved"].id,
        name: PRESCRIPTION_STATUS["approved"].name,
        createdAt: "2022-08-22T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-08-21T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-08-20T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase4: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["purchased"].id,
      name: PRESCRIPTION_STATUS["purchased"].name,
      activityMessage: "Resepmu sudah ditebus. Cepat sembuh ya!",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["purchased"].id,
        name: PRESCRIPTION_STATUS["purchased"].name,
        createdAt: "2022-08-26T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["approved"].id,
        name: PRESCRIPTION_STATUS["approved"].name,
        createdAt: "2022-08-25T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-08-24T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-08-23T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase5: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["request_expired"].id,
      name: PRESCRIPTION_STATUS["request_expired"].name,
      activityMessage: "Tenang, coba tebus ulang resepmu ya.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["request_expired"].id,
        name: PRESCRIPTION_STATUS["request_expired"].name,
        createdAt: "2022-08-29T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-08-28T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-08-27T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase6: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["rejected"].id,
      name: PRESCRIPTION_STATUS["rejected"].name,
      activityMessage: "Maaf, coba tebus ulang resep yang lain ya.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["rejected"].id,
        name: PRESCRIPTION_STATUS["rejected"].name,
        createdAt: "2022-09-03T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-09-02T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-09-01T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase7: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["expired"].id,
      name: PRESCRIPTION_STATUS["expired"].name,
      activityMessage: "Kamu bisa chat dokter untuk resep baru.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["expired"].id,
        name: PRESCRIPTION_STATUS["expired"].name,
        createdAt: "2022-09-07T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["approved"].id,
        name: PRESCRIPTION_STATUS["approved"].name,
        createdAt: "2022-09-06T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["requested"].id,
        name: PRESCRIPTION_STATUS["requested"].name,
        createdAt: "2022-09-05T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-09-04T19:45:00.000+07:00",
      },
    ],
  },
};

const previewCase8: PartialDeep<PrescriptionHistoryResponse> = {
  data: {
    status: {
      id: PRESCRIPTION_STATUS["cancelled"].id,
      name: PRESCRIPTION_STATUS["cancelled"].name,
      activityMessage: "Resepmu sudah dibatalkan.",
    },
    histories: [
      {
        id: PRESCRIPTION_STATUS["cancelled"].id,
        name: PRESCRIPTION_STATUS["cancelled"].name,
        createdAt: "2022-09-09T19:45:00.000+07:00",
      },
      {
        id: PRESCRIPTION_STATUS["created"].id,
        name: PRESCRIPTION_STATUS["created"].name,
        createdAt: "2022-09-08T19:45:00.000+07:00",
      },
    ],
  },
};

export const DesktopWithCreatedStatus: PrescriptionStatusLogPopupStory = {
  render: (args) => (
    <Box width="730px">
      <PrescriptionStatusLogPopup {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: "PR2208EKCXOFN",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase1),
      ],
    },
  },
};

export const DesktopWithRequestedStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFM",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase2),
      ],
    },
  },
};

export const DesktopWithApprovedStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFO",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase3),
      ],
    },
  },
};

export const DesktopWithPurchasedStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFP",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase4),
      ],
    },
  },
};

export const DesktopWithRequestExpiredStatus: PrescriptionStatusLogPopupStory =
  {
    ...DesktopWithCreatedStatus,
    args: {
      prescriptionNo: "PR2208EKCXOFQ",
    },
    parameters: {
      msw: {
        handlers: [
          generateGetPrescriptionRequest(),
          generateGetPrescriptionHistoryRequest(previewCase5),
        ],
      },
    },
  };

export const DesktopWithRejectedStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFR",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase6),
      ],
    },
  },
};

export const DesktopWithExpiredStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFS",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase7),
      ],
    },
  },
};

export const DesktopWithCancelledStatus: PrescriptionStatusLogPopupStory = {
  ...DesktopWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFS",
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase8),
      ],
    },
  },
};

export const MobileWithCreatedStatus: PrescriptionStatusLogPopupStory = {
  render: (args) => (
    <Box width="328px">
      <PrescriptionStatusLogPopup {...args} />
    </Box>
  ),
  args: {
    prescriptionNo: "PR2208EKCXOFT",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase1),
      ],
    },
  },
};

export const MobileWithRequestedStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFU",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase2),
      ],
    },
  },
};

export const MobileWithApprovedStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFV",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase3),
      ],
    },
  },
};

export const MobileWithPurchasedStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFW",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase4),
      ],
    },
  },
};

export const MobileWithRequestExpiredStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFX",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase5),
      ],
    },
  },
};

export const MobileWithRejectedStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFY",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase6),
      ],
    },
  },
};

export const MobileWithExpiredStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOFZ",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase7),
      ],
    },
  },
};

export const MobileWithCancelledStatus: PrescriptionStatusLogPopupStory = {
  ...MobileWithCreatedStatus,
  args: {
    prescriptionNo: "PR2208EKCXOGS",
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(),
        generateGetPrescriptionHistoryRequest(previewCase8),
      ],
    },
  },
};
