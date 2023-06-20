import React from "react";
import { PartialDeep } from "type-fest";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionActions,
  PrescriptionActionsProps,
  PrescriptionResponse,
} from "..";
import { generateGetPrescriptionRequest } from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Actions",
  component: PrescriptionActions,
} as Meta;

type PrescriptionActionsStory = StoryObj<PrescriptionActionsProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";

const previewCase1: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "created",
      name: "Resep Baru",
      activityMessage: "Dokter sudah memberikan resep untukmu",
    },
  },
};

const previewCase2: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "approved",
      name: "Siap Ditebus",
      activityMessage: "Obat sudah tersedia. Yuk, tebus obatmu.",
    },
  },
};

const previewCase3: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "request_expired",
      name: "Gagal Diproses",
      activityMessage: "Tenang, coba tebus ulang resepmu ya.",
    },
  },
};

const previewCase4: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "expired",
      name: "Kedaluwarsa",
      activityMessage: "Kamu bisa chat dokter untuk resep baru.",
    },
  },
};

const previewCase5: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "rejected",
      name: "Ditolak",
      activityMessage: "Maaf, resepmu ditolak.",
    },
  },
};

function renderDesktop(args: PrescriptionActionsProps) {
  return (
    <Box width="600px">
      <PrescriptionActions {...args} />
    </Box>
  );
}

function renderMobile(args: PrescriptionActionsProps) {
  return (
    <Box width="340px">
      <PrescriptionActions {...args} />
    </Box>
  );
}

export const DesktopWithCreatedStatus: PrescriptionActionsStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase1)],
    },
  },
};

export const MobileWithCreatedStatus: PrescriptionActionsStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase1)],
    },
  },
};

export const DesktopWithApprovedStatus: PrescriptionActionsStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase2)],
    },
  },
};

export const MobileWithApprovedStatus: PrescriptionActionsStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase2)],
    },
  },
};

export const DesktopWithRequestExpiredStatus: PrescriptionActionsStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase3)],
    },
  },
};

export const MobileWithRequestExpiredStatus: PrescriptionActionsStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase3)],
    },
  },
};

export const DesktopWithExpiredStatus: PrescriptionActionsStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase4)],
    },
  },
};

export const MobileWithExpiredStatus: PrescriptionActionsStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase4)],
    },
  },
};

export const DesktopWithRejectedStatus: PrescriptionActionsStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase5)],
    },
  },
};

export const MobileWithRejectedStatus: PrescriptionActionsStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [generateGetPrescriptionRequest(previewCase5)],
    },
  },
};
