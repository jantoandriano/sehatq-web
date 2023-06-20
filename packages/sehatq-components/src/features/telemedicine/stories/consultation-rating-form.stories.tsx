import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Box, RatingInputValue } from "../../../user-interfaces";
import {
  ConsultationRatingForm,
  ConsultationRatingFormProps,
  CONSULTATION_RATING_TAGS_OPTIONS,
} from "..";
import {
  getProfile,
  generateFakeProfileResponse,
} from "../../profile/msw-handlers";
import {
  submitConsultationRating,
  generateGetTelemedicineHCP,
  generateFakeTelemedicineHCPResponse,
  generateFakeSubmitConsultationRatingResponse,
} from "../msw-handlers";

export default {
  title: "Features / Telemedicine / Consultation Rating Form",
  component: ConsultationRatingForm,
} as Meta;

type ConsultationRatingFormStory = StoryObj<ConsultationRatingFormProps>;

const DOCTOR_SLUG = "syilfia-felisia";
const CONSULTATION_ID = "12973";

async function expectConsultationForm(
  elementScreen: ReturnType<typeof within>,
  dataProfile: {
    name: string;
    experience: string;
    specialityName: string;
    str: string;
  },
  isMobile?: boolean
) {
  await elementScreen.findByText("Penilaian Konsultasi");
  await elementScreen.findByText("Bagaimana pengalaman Anda?");
  await elementScreen.findByText("Beri ulasan mengenai dokter Anda");

  expect(elementScreen.getByText(CONSULTATION_ID)).toBeInTheDocument();
  expect(elementScreen.getByText("Nomor Tiket")).toBeInTheDocument();

  if (isMobile) {
    await elementScreen.findByText(dataProfile.name);
    await elementScreen.findByText(dataProfile.experience);
    await elementScreen.findByText(dataProfile.specialityName);
    await elementScreen.findByText(dataProfile.str);
  }
}

function playUnitTest(rating: RatingInputValue, isMobile?: boolean) {
  return async () => {
    const placeholder =
      "Dokter dapat menjelaskan dan memberi solusi beserta resep dan tindakan yang perlu saya ambil berikutnya";
    const ulasanValue =
      "Dokter cukup baik dalam menjelaskan tentang penyakit saya.";
    const { data: profile } = generateFakeProfileResponse();
    const query = { doctorId: DOCTOR_SLUG };
    const response = generateFakeTelemedicineHCPResponse(query);
    const { name, title, experience, speciality, str } = response.data;
    const dataProfile = {
      name: title === null ? name : `${title} ${name}`,
      experience,
      specialityName: speciality.name,
      str,
    };
    await expectConsultationForm(screen, dataProfile, isMobile);

    if (profile.id) {
      const submitButton = await screen.findByRole("button", {
        name: "Selesai",
      });
      expect(submitButton).toBeInTheDocument();

      // Rating
      const starButton = await screen.findByRole("button", {
        name: `${rating} star`,
      });
      expect(starButton).toBeInTheDocument();
      userEvent.click(starButton);

      // Tag
      const tagValues = CONSULTATION_RATING_TAGS_OPTIONS[rating].tags;
      for (let i = 0; i < tagValues.length; i++) {
        const tagButton = await screen.findByRole("button", {
          name: tagValues[i],
        });
        expect(tagButton).toBeInTheDocument();
        userEvent.click(tagButton);
      }

      // Ulasan
      userEvent.type(screen.getByPlaceholderText(placeholder), ulasanValue);
      expect(screen.getByPlaceholderText(placeholder)).toHaveValue(ulasanValue);

      // Submit
      userEvent.click(submitButton);
      const submitConsultationRatingVariables = {
        consultationId: CONSULTATION_ID,
        rating: Number(rating),
        review: ulasanValue,
        tag: tagValues,
      };
      const {
        meta: { message },
      } = generateFakeSubmitConsultationRatingResponse(
        submitConsultationRatingVariables
      );
      const toastMessage = await screen.findByText(message);
      expect(toastMessage).toBeInTheDocument();
    }
  };
}

export const DesktopWith5Rating: ConsultationRatingFormStory = {
  render: (args) => (
    <Box width="777px">
      <ConsultationRatingForm {...args} />
    </Box>
  ),
  args: {
    consultationId: CONSULTATION_ID,
    doctorId: DOCTOR_SLUG,
    enabledFetch: true,
  },
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("5"),
};

export const DesktopWith4Rating: ConsultationRatingFormStory = {
  ...DesktopWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("4"),
};

export const DesktopWith3Rating: ConsultationRatingFormStory = {
  ...DesktopWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("3"),
};

export const DesktopWith2Rating: ConsultationRatingFormStory = {
  ...DesktopWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("2"),
};

export const DesktopWith1Rating: ConsultationRatingFormStory = {
  ...DesktopWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("1"),
};

export const MobileWith5Rating: ConsultationRatingFormStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <ConsultationRatingForm {...args} />
    </Box>
  ),
  args: {
    consultationId: CONSULTATION_ID,
    doctorId: DOCTOR_SLUG,
    enabledFetch: true,
    isMobile: true,
  },
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("5", true),
};

export const MobileWith4Rating: ConsultationRatingFormStory = {
  ...MobileWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("4", true),
};

export const MobileWith3Rating: ConsultationRatingFormStory = {
  ...MobileWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("3", true),
};

export const MobileWith2Rating: ConsultationRatingFormStory = {
  ...MobileWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("2", true),
};

export const MobileWith1Rating: ConsultationRatingFormStory = {
  ...MobileWith5Rating,
  parameters: {
    msw: {
      handlers: [
        getProfile,
        generateGetTelemedicineHCP(),
        submitConsultationRating,
      ],
    },
  },
  play: playUnitTest("1", true),
};
