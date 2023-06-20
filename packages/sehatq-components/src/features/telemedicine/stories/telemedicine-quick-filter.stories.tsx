import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { screen, within } from "@storybook/testing-library";
import { URLS } from "@sehatq/constants";
import { hashStringToNumber, queryToString } from "@sehatq/utils";
import { expect } from "@storybook/jest";
import { Box } from "../../../user-interfaces";
import { TelemedicineQuickFilter, TelemedicineQuickFilterProps } from "..";
import {
  generateFakeTelemedicineDoctorsResponse,
  getTelemedicineDoctors,
} from "../msw-handlers";
import { getQuickFilterKey } from "../telemedicine-filter-helpers";
export default {
  title: "Features / Telemedicine / Telemedicine Quick Filter",
  component: TelemedicineQuickFilter,
  parameters: {
    msw: {
      handlers: [getTelemedicineDoctors],
    },
  },
} as Meta;

type TelemedicineQuickFilterStory = StoryObj<TelemedicineQuickFilterProps>;

const defaultArgs = {
  page: "1",
  perPage: "12",
  city: "Jakarta Timur",
  sortBy: "",
  userLat: "",
  userLong: "",
  query: "",
  campaignSlug: "",
  doctorExperience: "",
  gender: "",
  price: "",
  specialitySlug: "",
  navigateName: "TELEMED_CAMPAIGN" as keyof typeof URLS,
};

// describe TelemedicineQuickFilter
async function expectDoctorLink(
  elementScreen: ReturnType<typeof within>,
  filter: {
    id: string;
    name: string;
    param: string;
  }
) {
  const key = getQuickFilterKey(filter.param);

  // try to find element data
  const doctorLink = await elementScreen.getByRole("link", {
    name: filter.name,
  });

  // element must be in the document
  expect(doctorLink).toBeInTheDocument();

  // element must have href attribute with specific value
  expect(doctorLink.getAttribute("href")).toEqual(
    `${URLS.TELEMED_CAMPAIGN}${queryToString({
      [key]: filter.id,
      page: 1,
    })}`
  );
}

export const Mobile: TelemedicineQuickFilterStory = {
  render: (args) => (
    <Box width="328px">
      <TelemedicineQuickFilter {...args} />
    </Box>
  ),
  args: { ...defaultArgs },
  play: async () => {
    const query = {
      page: "1",
      perPage: "10",
      city: "Jakarta Timur",
    };
    const seedKey = hashStringToNumber(queryToString(query));
    const response = generateFakeTelemedicineDoctorsResponse(seedKey);

    // wait until all data appears
    await screen.findByRole("link", {
      name: response.meta.quickFilter[response.meta.quickFilter.length - 1]
        .name,
    });

    // run test cases for all data
    response.meta.quickFilter.forEach((quickFilter) => {
      expectDoctorLink(screen, quickFilter);
    });
  },
};
