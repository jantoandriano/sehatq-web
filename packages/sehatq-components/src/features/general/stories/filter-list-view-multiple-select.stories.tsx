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
import { generateMultipleValues } from "../filter-list-view-desktop";

export default {
  title: "Features / General / Filter List View",
  component: FilterListView,
} as Meta;

type FilterListViewStory = StoryObj<FilterListViewProps>;
const defaultArgs = {
  filterKey: "specialitySlug",
  filterName: "Spesialisasi",
  selectedValue: "jantung,bedah-paru",
  selectedName: "Jantung, Bedah Paru",
  options: [
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
  const selectedValue = defaultArgs.selectedValue;

  // try to find selected in multiple option
  if (selectedValue == option.value) {
    expect(
      await screen.findByRole("checkbox", {
        checked: true,
      })
    ).toBeInTheDocument();
  }

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
          specialitySlug: generateMultipleValues(
            selectedValue.split(","),
            option.value,
            selectedValue.split(",").includes(option.value)
          ),
        })}`
      );
    }
  }
}

function playTest(isMobile?: boolean) {
  return async () => {
    const filter = await screen.findByText("Spesialisasi");
    expect(filter).toBeInTheDocument();
    userEvent.click(filter);

    // expect to show all options
    defaultArgs.options.forEach((option) =>
      expectOptionsLink(option, isMobile)
    );

    // select option
    const option = await screen.findByRole(isMobile ? "button" : "link", {
      name: defaultArgs.options[4].name,
    });
    userEvent.click(filter);
    if (isMobile) {
      await waitForElementToBeRemoved(option);
    }
    expect(option).not.toBeInTheDocument();
  };
}

export const DesktopMultipleSelect: FilterListViewStory = {
  render: (args) => (
    <Box width="760px">
      <FilterListView {...args} isMultiple />
    </Box>
  ),
  args: {
    ...defaultArgs,
    navigateName: "HEALTH_CARE_PROFESIONAL",
  },
  play: playTest(),
};

export const MobileMultipleSelect: FilterListViewStory = {
  render: (args) => {
    return (
      <Box width="360px">
        <FilterListView
          {...args}
          isMobile
          isMultiple
          onSelectedValueChange={(selectedValue) => console.log(selectedValue)}
        />
      </Box>
    );
  },
  args: {
    ...defaultArgs,
  },
  play: playTest(true),
};
