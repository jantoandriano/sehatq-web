import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { parseToDate, formatDate } from "@sehatq/utils";
import { Box } from "../../../user-interfaces";
import { ConsultationForm, ConsultationFormProps } from "..";
import {
  getFamilyMembers,
  getProfile,
  generateFakeProfileResponse,
  generateFakeFamilyMembersResponse,
} from "../../profile/msw-handlers";
import {
  submitConsultation,
  updateConsultation,
  generateFakeSubmitConsultationResponse,
} from "../msw-handlers";
export default {
  title: "Features / Telemedicine / Consultation Form",
  component: ConsultationForm,
  parameters: {
    msw: {
      handlers: [
        getFamilyMembers,
        getProfile,
        submitConsultation,
        updateConsultation,
      ],
    },
  },
} as Meta;

type ConsultationFormStory = StoryObj<ConsultationFormProps>;

function playGeneral(isMobile?: boolean) {
  return async () => {
    const { data: profile } = generateFakeProfileResponse();
    const { data: families } = generateFakeFamilyMembersResponse({
      includeMe: "1",
    });
    const selected = families.find((family) => family.id === profile.id);
    if (!selected) return;

    // Check field value
    if (isMobile) {
      const familyInput = await screen.findByRole("button", {
        name: `${selected.name}(${selected.relation ?? "Saya"})`,
      });
      expect(familyInput).toBeInTheDocument();
    } else {
      const familyInputValue = await screen.findByTestId("family-input-value");
      const familyInputValueScreen = within(familyInputValue);
      expect(
        familyInputValueScreen.getByText(profile.name)
      ).toBeInTheDocument();
    }
    expect(screen.getByLabelText("Keluhan")).toHaveValue(
      "Saya ingin membeli obat Panadol"
    );
    if (selected.birthDate) {
      expect(screen.getByLabelText("Tanggal Lahir")).toHaveValue(
        parseToDate(selected.birthDate, "yyyy-MM-dd").toISOString()
      );
    }
    if (selected.phone) {
      expect(screen.getByLabelText("No. Handphone")).toHaveValue(
        +selected.phone
      );
    }
    expect(screen.getByLabelText("Jenis Kelamin")).toHaveValue(selected.gender);

    // Submit
    const submitButton = screen.getByRole("button", { name: "Lanjutkan" });
    userEvent.click(submitButton);
    const submitConsultationVariables = {
      allergies: "",
      ethicalDrug: "",
      historyDisease: "",
      age: selected.age,
      birthDate: formatDate(
        new Date(selected.birthDate as string),
        "yyyy-MM-dd"
      ),
      userId: selected.id,
      name: selected.name,
      gender: selected.gender,
      weight: selected.weight,
      height: selected.height,
      relation: selected.relation?.name ?? "Saya",
      userPhotoUrl: selected.photoUrl,
      phone: selected.phone as string,
      symptom: "Saya ingin membeli obat Panadol",
      type: "regular-consultation",
      drug: {
        name: "Panadol",
        qty: 1,
        tokoId: 1,
      },
    };
    const {
      meta: { message },
    } = generateFakeSubmitConsultationResponse(submitConsultationVariables);
    const toastMessage = await screen.findByText(message);
    expect(toastMessage).toBeInTheDocument();
  };
}

export const GeneralDesktop: ConsultationFormStory = {
  render: () => (
    <Box width="760px">
      <ConsultationForm
        type="regular"
        drug={{
          id: 1,
          name: "Panadol",
        }}
      />
    </Box>
  ),
  play: playGeneral(),
};

export const GeneralMobile: ConsultationFormStory = {
  render: () => (
    <Box width="328px">
      <ConsultationForm
        isMobile
        type="regular"
        drug={{
          id: 1,
          name: "Panadol",
        }}
      />
    </Box>
  ),
  play: playGeneral(true),
};

function playValidation(isMobile?: boolean) {
  return async () => {
    const { data: profile } = generateFakeProfileResponse();
    const { data: families } = generateFakeFamilyMembersResponse({
      includeMe: "1",
    });
    const selected = families.find((family) => family.name === "New User");
    if (!selected) return;
    // Change family input value
    if (isMobile) {
      const button = await screen.findByRole("button", {
        name: `${profile.name}(Saya)`,
      });
      userEvent.click(button);
      const modal = await screen.findByRole("dialog");
      const modalScreen = within(modal);
      const radio = await modalScreen.findByLabelText(
        new RegExp(selected.name)
      );
      userEvent.click(radio);
      userEvent.click(modalScreen.getByRole("button", { name: "Lanjutkan" }));
      await waitFor(() => expect(modal).not.toBeInTheDocument());
    } else {
      const familyInput = await screen.findByRole("button", {
        name: "Pilih Keluarga",
      });
      expect(familyInput).toBeInTheDocument();
      userEvent.click(familyInput);
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeVisible();
      });
      const menu = screen.getByRole("menu", { hidden: false });
      const menuScreen = within(menu);
      const menuItem = await menuScreen.findByRole("menuitem", {
        name: new RegExp(selected.name),
      });
      userEvent.click(menuItem);
      expect(menu).not.toBeVisible();
    }

    // Show field error
    const submitButton = screen.getByRole("button", { name: "Lanjutkan" });
    userEvent.click(submitButton);
    const symptomError = await screen.findByText("Keluhan perlu diisi");
    expect(symptomError).toBeInTheDocument();
    const birthDateError = screen.getByText("Tanggal lahir perlu diisi");
    expect(birthDateError).toBeInTheDocument();
    const phoneError = screen.getByText("No. Handphone perlu diisi");
    expect(phoneError).toBeInTheDocument();
    const genderError = screen.getByText("Jenis kelamin perlu diisi");
    expect(genderError).toBeInTheDocument();
    const identityNumberError = screen.getByText("NIK perlu diisi");
    expect(identityNumberError).toBeInTheDocument();
    const addressError = screen.getByText("Alamat perlu diisi");
    expect(addressError).toBeInTheDocument();

    // Fill field
    userEvent.type(screen.getByLabelText("Keluhan"), "Saya sakit");
    await waitFor(() => expect(symptomError).not.toBeInTheDocument());
    userEvent.click(screen.getByRole("button", { name: "Tanggal Lahir" }));
    if (isMobile) {
      await screen.findByRole("dialog");
    } else {
      await waitFor(() => {
        expect(screen.getByRole("dialog")).toBeVisible();
      });
    }
    const datePickerDialog = screen.getByRole("dialog");
    userEvent.selectOptions(screen.getByLabelText("Month:"), "November");
    userEvent.selectOptions(screen.getByLabelText("Year:"), "2011");
    userEvent.click(screen.getByText("11"));
    if (isMobile) {
      await waitFor(() => expect(datePickerDialog).not.toBeInTheDocument());
    } else {
      await waitFor(() => expect(datePickerDialog).not.toBeVisible());
    }
    await waitFor(() => expect(birthDateError).not.toBeInTheDocument());
    userEvent.type(screen.getByLabelText("No. Handphone"), "6211111111111");
    await waitFor(() => expect(phoneError).not.toBeInTheDocument());
    userEvent.click(screen.getByRole("button", { name: "Jenis Kelamin" }));
    if (isMobile) {
      const genderDialog = await screen.findByRole("dialog");
      const genderDialogScreen = within(genderDialog);
      const genderRadio = await genderDialogScreen.findByLabelText("Pria");
      userEvent.click(genderRadio);
      await waitFor(() => expect(genderDialog).not.toBeInTheDocument());
    } else {
      await waitFor(() => {
        expect(screen.getByRole("menu")).toBeVisible();
      });
      const genderMenu = screen.getByRole("menu");
      const genderMenuScreen = within(genderMenu);
      const genderMenuItem = await genderMenuScreen.findByRole("menuitem", {
        name: "Pria",
      });
      userEvent.click(genderMenuItem);
      expect(genderMenu).not.toBeVisible();
    }
    await waitFor(() => expect(genderError).not.toBeInTheDocument());
    userEvent.type(screen.getByLabelText("NIK"), "1111111111111111");
    await waitFor(() => expect(identityNumberError).not.toBeInTheDocument());
    userEvent.type(
      screen.getByLabelText("Alamat"),
      "Gedung PT. SehatQ Harsana Emedika"
    );
    await waitFor(() => expect(addressError).not.toBeInTheDocument());

    // Submit
    userEvent.click(submitButton);
    const submitConsultationVariables = {
      allergies: "",
      ethicalDrug: "",
      historyDisease: "",
      age: selected.age,
      birthDate: "2011-11-11",
      userId: selected.id,
      name: selected.name,
      gender: "m",
      weight: selected.weight,
      height: selected.height,
      relation: selected.relation?.name ?? "Saya",
      userPhotoUrl: selected.photoUrl,
      phone: "6211111111111",
      symptom: "Saya sakit",
      address: "Gedung PT. SehatQ Harsana Emedika",
      identityNumber: "1111111111111111",
      status: "initToPending" as const,
      consultationId: "11",
    };
    const {
      meta: { message },
    } = generateFakeSubmitConsultationResponse(submitConsultationVariables);
    const toastMessage = await screen.findByText(message);
    expect(toastMessage).toBeInTheDocument();
  };
}

export const ValidationDesktop: ConsultationFormStory = {
  render: () => (
    <Box width="760px">
      <ConsultationForm
        type="walk-in"
        consultationId="11"
        isShowNikAndAddress
      />
    </Box>
  ),
  play: playValidation(),
};

export const ValidationMobile: ConsultationFormStory = {
  render: () => (
    <Box width="328px">
      <ConsultationForm
        isMobile
        type="walk-in"
        consultationId="11"
        isShowNikAndAddress
      />
    </Box>
  ),
  play: playValidation(true),
};
