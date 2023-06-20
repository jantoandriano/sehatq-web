import React from "react";
import { PartialDeep } from "type-fest";
import { Meta, StoryObj } from "@storybook/react";
import { Box } from "../../../user-interfaces";
import {
  PrescriptionInfoCard,
  PrescriptionInfoCardProps,
  PrescriptionResponse,
} from "..";
import {
  generateGetPrescriptionRequest,
  generateGetPrescriptionProducts,
} from "../msw-handlers";

export default {
  title: "Features / Prescription / Prescription Info Card",
  component: PrescriptionInfoCard,
} as Meta;

type PrescriptionInfoCardStory = StoryObj<PrescriptionInfoCardProps>;

const PRESCRIPTION_NO = "PR2206VKAS5LA";
const PRESCRIPTION_SOURCE = {
  teleconsultation: {
    id: "teleconsultation",
    name: "Chat Dokter",
  },
  userUpload: {
    id: "user_upload",
    name: "Upload Resep",
  },
};

const previewCase1: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "created",
      name: "Resep Baru",
      activityMessage: "Dokter sudah memberikan resep untukmu",
    },
    source: PRESCRIPTION_SOURCE.teleconsultation,
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
    source: PRESCRIPTION_SOURCE.userUpload,
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
    source: PRESCRIPTION_SOURCE.userUpload,
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
    source: PRESCRIPTION_SOURCE.userUpload,
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
    source: PRESCRIPTION_SOURCE.teleconsultation,
  },
};

const previewCase6: PartialDeep<PrescriptionResponse> = {
  data: {
    number: PRESCRIPTION_NO,
    status: {
      id: "created",
      name: "Resep Baru",
      activityMessage: "Dokter sudah memberikan resep untukmu",
    },
    source: {
      id: "user_upload",
      name: "Upload Resep",
    },
  },
};

function renderDesktop(args: PrescriptionInfoCardProps) {
  return (
    <Box width="730px">
      <PrescriptionInfoCard {...args} />
    </Box>
  );
}

function renderMobile(args: PrescriptionInfoCardProps) {
  return (
    <Box width="328px">
      <PrescriptionInfoCard {...args} />
    </Box>
  );
}

export const DesktopDoctorChatWithCreatedStatus: PrescriptionInfoCardStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase1),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const MobileDoctorChatWithCreatedStatus: PrescriptionInfoCardStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase1),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const DesktopUserUploadWithApprovedStatus: PrescriptionInfoCardStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase2),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const MobileUserUploadWithApprovedStatus: PrescriptionInfoCardStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase2),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const DesktopUserUploadWithCreatedStatus: PrescriptionInfoCardStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase6),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const MobileUserUploadWithCreatedStatus: PrescriptionInfoCardStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase6),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const DesktopUserUploadWithRequestExpiredStatus: PrescriptionInfoCardStory =
  {
    render: renderDesktop,
    args: {
      prescriptionNo: PRESCRIPTION_NO,
    },
    parameters: {
      msw: {
        handlers: [
          generateGetPrescriptionRequest(previewCase3),
          generateGetPrescriptionProducts,
        ],
      },
    },
  };

export const MobileUserUploadWithRequestExpiredStatus: PrescriptionInfoCardStory =
  {
    render: renderMobile,
    args: {
      prescriptionNo: PRESCRIPTION_NO,
      isMobile: true,
    },
    parameters: {
      msw: {
        handlers: [
          generateGetPrescriptionRequest(previewCase3),
          generateGetPrescriptionProducts,
        ],
      },
    },
  };

export const DesktopUserUploadWithExpiredStatus: PrescriptionInfoCardStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase4),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const MobileUserUploadWithExpiredStatus: PrescriptionInfoCardStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase4),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const DesktopDoctorChatWithRejectedStatus: PrescriptionInfoCardStory = {
  render: renderDesktop,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase5),
        generateGetPrescriptionProducts,
      ],
    },
  },
};

export const MobileDoctorChatWithRejectedStatus: PrescriptionInfoCardStory = {
  render: renderMobile,
  args: {
    prescriptionNo: PRESCRIPTION_NO,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        generateGetPrescriptionRequest(previewCase5),
        generateGetPrescriptionProducts,
      ],
    },
  },
};
