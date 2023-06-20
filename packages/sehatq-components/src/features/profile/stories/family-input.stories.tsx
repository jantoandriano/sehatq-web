import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { screen, within, userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { FamilyInputProps, FamilyInput } from "..";
import {
  getFamilyMembers,
  generateFakeFamilyMembersResponse,
} from "../msw-handlers";
import { Box } from "../../../user-interfaces";
export default {
  title: "Features / Profile / Family Input",
  component: FamilyInput,
  parameters: {
    msw: {
      handlers: [getFamilyMembers],
    },
  },
} as Meta;

type FamilyInputStory = StoryObj<FamilyInputProps>;

function Wrapper(props: { isMobile: boolean }) {
  const { isMobile } = props;
  const [value, setValue] = useState<number | undefined>();
  function onChange(newValue: { userId: number } | undefined) {
    setValue(newValue?.userId);
  }
  return (
    <Box width={isMobile ? "328px" : "760px"}>
      <FamilyInput
        {...props}
        isMobile={isMobile}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

export const Desktop: FamilyInputStory = {
  render: (args) => <Wrapper {...args} isMobile={false} />,
  args: {
    hasGuest: false,
  },
  play: async () => {
    const query = {
      includeMe: "1",
    };
    const response = generateFakeFamilyMembersResponse(query);

    // Render before data fetching
    const button = await screen.findByRole("button", {
      name: "Pilih Keluarga",
    });
    expect(button).toBeInTheDocument();

    // Render after data fetching
    userEvent.click(button);
    const menu = await screen.findByRole("menu");
    const menuScreen = within(menu);
    const menuItem = await menuScreen.findByRole("menuitem", {
      name: new RegExp(response.data[1].name),
    });

    // Change value
    userEvent.click(menuItem);
    expect(menu).not.toBeVisible();
    const familyInputValue = await screen.findByTestId("family-input-value");
    const familyInputValueScreen = within(familyInputValue);
    expect(
      familyInputValueScreen.getByText(response.data[1].name)
    ).toBeInTheDocument();
    expect(
      familyInputValueScreen.getByText(
        response.data[1].relation?.name ?? "Saya"
      )
    ).toBeInTheDocument();
    expect(
      familyInputValueScreen.getByText(`${response.data[1].age ?? 0} Tahun`)
    ).toBeInTheDocument();
    userEvent.click(button);
    await waitFor(() => expect(menu).toBeVisible());
    const menuItemScreen = within(menuItem);
    expect(menuItemScreen.getByText("Dipilih")).toBeInTheDocument();
  },
};

export const Mobile: FamilyInputStory = {
  render: (args) => <Wrapper {...args} isMobile />,
  args: {
    hasGuest: false,
  },
  play: async () => {
    const query = {
      includeMe: "1",
    };
    const response = generateFakeFamilyMembersResponse(query);

    // Render before data fetching
    const button = await screen.findByRole("button", {
      name: "Pilih Keluarga",
    });
    expect(button).toBeInTheDocument();

    // Render after data fetching
    userEvent.click(button);
    const modal = await screen.findByRole("dialog");
    const modalScreen = within(modal);
    const menuItem = await modalScreen.findByRole("menuitem", {
      name: new RegExp(response.data[1].name),
    });

    userEvent.click(menuItem);
    await waitFor(() => expect(modal).not.toBeVisible());
    const familyInputValue = await screen.findByTestId("family-input-value");
    const familyInputValueScreen = within(familyInputValue);
    expect(
      familyInputValueScreen.getByText(response.data[1].name)
    ).toBeInTheDocument();
    expect(
      familyInputValueScreen.getByText(
        response.data[1].relation?.name ?? "Saya"
      )
    ).toBeInTheDocument();
    expect(
      familyInputValueScreen.getByText(`${response.data[1].age ?? 0} Tahun`)
    ).toBeInTheDocument();
    userEvent.click(button);
    const dialog = await screen.findByRole("dialog");
    const dialogScreen = within(dialog);
    await waitFor(() => expect(dialog).toBeVisible());
    expect(dialogScreen.getByText("Dipilih")).toBeInTheDocument();
  },
};
