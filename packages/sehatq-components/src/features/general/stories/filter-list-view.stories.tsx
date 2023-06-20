import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { queryToString } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import { Box } from "../../../user-interfaces";
import { FilterListView, FilterListViewProps } from "..";

export default {
  title: "Features / General / Filter List View",
  component: FilterListView,
} as Meta;

type FilterListViewStory = StoryObj<FilterListViewProps>;
const defaultArgs = {
  showSearch: true,
  filterKey: "specialitySlug",
  filterName: "Spesialisasi",
  selectedValue: "",
  selectedName: "",
  options: [
    {
      value: "",
      name: "Semua",
    },
    {
      value: "akupuntur",
      name: "Akupuntur",
      iconUrl:
        "https://static-dev.sehatq.com/cdn-cgi/image/format=auto,width=32,quality=90/telemed-dev/speciality/Akupuntur.png",
    },
    {
      value: "anak",
      name: "Anak",
    },
    {
      value: "jantung",
      name: "Jantung",
    },
    {
      value: "bedah-paru",
      name: "Bedah Paru",
    },
    {
      value: "bedah-kulit",
      name: "Bedah Kulit",
    },
  ],
};

// describe options
async function expectOptionsLink(
  option: {
    value: string;
    name: string;
    iconUrl?: string;
  },
  isMobile?: boolean
) {
  // find icon element
  if (option.iconUrl) {
    const image = await screen.findByRole("img", {
      name: option.name,
    });
    expect(image.getAttribute("src")).toEqual(option.iconUrl);
  } else {
    // try to find option
    const link = await screen.findByRole(isMobile ? "button" : "link", {
      name: option.name,
    });

    if (!isMobile) {
      // element must have href attribute with specific value
      expect(link.getAttribute("href")).toEqual(
        `${URLS.HEALTH_CARE_PROFESIONAL}${queryToString({
          specialitySlug: option.value,
        })}`
      );
    }
  }
}

async function searchResult(
  option: { value: string; name: string },
  isMobile?: boolean
) {
  // try to find element data
  const link = await screen.findByRole(isMobile ? "button" : "link", {
    name: option.name,
  });

  // element must be in the document
  expect(link).toBeInTheDocument();

  if (!isMobile) {
    // element must have href attribute with specific value

    expect(link.getAttribute("href")).toEqual(
      `${URLS.HEALTH_CARE_PROFESIONAL}${queryToString({
        specialitySlug: option.value,
      })}`
    );
  }
}

function playTest(isMobile?: boolean) {
  return async () => {
    const filter = await screen.findByText("Spesialisasi");
    expect(filter).toBeInTheDocument();
    userEvent.click(filter);

    // test filter search
    const searchBox = screen.getByPlaceholderText("Cari Spesialisasi");
    expect(searchBox).toBeInTheDocument();
    userEvent.type(searchBox, defaultArgs.options[2].name);
    searchResult(defaultArgs.options[2], isMobile);
    const clearButton = await screen.findByRole("button", { name: "clear" });
    expect(clearButton).toBeInTheDocument();
    userEvent.click(clearButton);

    // expect to show all options
    defaultArgs.options.forEach((option) =>
      expectOptionsLink(option, isMobile)
    );

    const link = await screen.findByRole(isMobile ? "button" : "link", {
      name: defaultArgs.options[2].name,
    });

    // select option
    if (isMobile) {
      userEvent.click(link);
      await waitForElementToBeRemoved(searchBox);
    } else {
      userEvent.click(filter);
    }
    expect(searchBox).not.toBeInTheDocument();
  };
}

export const Desktop: FilterListViewStory = {
  render: (args) => (
    <Box width="760px">
      <FilterListView {...args} />
    </Box>
  ),
  args: {
    ...defaultArgs,
    description: "description",
    isResetQuery: true,
    navigateName: "HEALTH_CARE_PROFESIONAL",
  },
  play: playTest(),
};

export const Mobile: FilterListViewStory = {
  render: (args) => {
    return (
      <Box width="360px">
        <FilterListView
          {...args}
          isMobile
          onSelectedValueChange={(selectedValue) => console.log(selectedValue)}
        />
      </Box>
    );
  },
  args: {
    ...defaultArgs,
    isResetQuery: true,
  },
  play: playTest(true),
};
