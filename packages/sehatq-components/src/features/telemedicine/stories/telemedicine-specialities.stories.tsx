import React from "react";
import { queryToString } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import { Meta, StoryObj } from "@storybook/react";
import {
  screen,
  within,
  userEvent,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Flex } from "../../../user-interfaces";
import {
  getTelemedicineSpecialities,
  generateFakeTelemedicineSpecialitiesResponse,
} from "../msw-handlers";
import {
  TelemedicineSpecialities,
  TelemedicineSpecialitiesProps,
  TelemedicineSpecialitiesResponse,
} from "..";

export default {
  title: "Features / Telemedicine / Telemedicine Specialities ",
  component: TelemedicineSpecialities,
  parameters: {
    msw: {
      handlers: [getTelemedicineSpecialities],
    },
  },
} as Meta;

type TelemedicineSpecialitiesStory = StoryObj<TelemedicineSpecialitiesProps>;

function expectSpecialityLink(
  elementScreen: ReturnType<typeof within>,
  speciality: TelemedicineSpecialitiesResponse["data"][number]
) {
  const specialityLink = elementScreen.getByRole("link", {
    name: speciality.name,
  });
  expect(specialityLink).toBeInTheDocument();
  expect(specialityLink.getAttribute("href")).toEqual(
    `${URLS.TELEMED_HCPS}${queryToString({
      slugs: [speciality.slug],
    })}`
  );
}

export const Desktop: TelemedicineSpecialitiesStory = {
  render: (args) => (
    <Flex direction="column" width="760px">
      <TelemedicineSpecialities {...args} />
    </Flex>
  ),
  play: async () => {
    const query = {
      page: "1",
      perPage: "100",
      hospitalId: "",
    };
    const response = generateFakeTelemedicineSpecialitiesResponse(query);

    // Render before data fetching
    await screen.findByText("Cari Dokter Umum atau Spesialis");
    expect(screen.getByText("Lihat Semua Spesialisasi")).toBeInTheDocument();

    // Render after data fetching
    await screen.findByRole("link", { name: response.data[0].name });

    // Render nine menus, the first is all speciality link, the second - the eighth are seventh first data and the ninth is all specialities modal button.
    response.data.slice(0, 12).forEach((speciality) => {
      expectSpecialityLink(screen, speciality);
    });

    // Open modal
    const modalButton = screen.getByText("Lihat Semua Spesialisasi");
    expect(modalButton).toBeInTheDocument();
    userEvent.click(modalButton);
    const modal = await screen.findByRole("dialog");
    const modalScreen = within(modal);
    expect(modalScreen.getByText("Cari Spesialisasi")).toBeInTheDocument();
    const specialityLink = modalScreen.getByRole("link", {
      name: "Semua",
    });
    expect(specialityLink).toBeInTheDocument();
    expect(specialityLink.getAttribute("href")).toEqual(URLS.TELEMED_HCPS);
    response.data.forEach((speciality) => {
      expectSpecialityLink(modalScreen, speciality);
    });

    // Close modal
    const closeButton = screen.getByLabelText("Close");
    expect(closeButton).toBeInTheDocument();
    userEvent.click(closeButton);
    await waitForElementToBeRemoved(modal);
  },
};

export const Mobile: TelemedicineSpecialitiesStory = {
  render: (args) => (
    <Flex direction="column" width="360px">
      <TelemedicineSpecialities {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
  play: async () => {
    const query = {
      page: "1",
      perPage: "100",
      hospitalId: "",
    };
    const response = generateFakeTelemedicineSpecialitiesResponse(query);

    // Render before data fetching
    await screen.findByText("Cari Dokter Umum atau Spesialis");

    // Render after data fetching
    await screen.findByRole("link", { name: response.data[0].name });

    // Render six menus, sixth first data.
    response.data.slice(0, 6).forEach((speciality) => {
      expectSpecialityLink(screen, speciality);
    });

    // Open modal
    const modalButton = screen.getByRole("button", { name: "Lihat Semua" });
    expect(modalButton).toBeInTheDocument();
    userEvent.click(modalButton);
    const modal = await screen.findByRole("dialog");
    const modalScreen = within(modal);
    expect(modalScreen.getByText("Cari Spesialisasi")).toBeInTheDocument();
    response.data.forEach((speciality) => {
      expectSpecialityLink(modalScreen, speciality);
    });

    // Search speciality
    const input = modalScreen.getByRole("textbox");
    userEvent.type(input, response.data[0].name);
    expect(input.getAttribute("value")).toEqual(response.data[0].name);
    expect(modalScreen.getAllByRole("link")).toHaveLength(2);

    // Close modal
    const closeButton = screen.getByLabelText("Back");
    expect(closeButton).toBeInTheDocument();
    userEvent.click(closeButton);
    await waitForElementToBeRemoved(modal);
  },
};
