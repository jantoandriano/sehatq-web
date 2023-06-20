import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Box } from "../../../user-interfaces";
import { reportForumSpam } from "../msw-handlers";
import { MarkForumAsSpam, MarkForumAsSpamProps } from "..";
import { getProfile } from "../../profile/msw-handlers";

export default {
  title: "Features / Forum / Mark Forum as Spam",
  component: MarkForumAsSpam,
  parameters: {
    msw: {
      handlers: [getProfile, reportForumSpam],
    },
  },
} as Meta;

type MarkForumAsSpamStory = StoryObj<MarkForumAsSpamProps>;

export const Desktop: MarkForumAsSpamStory = {
  render: (args) => (
    <Box width="1366px">
      <MarkForumAsSpam {...args} />
    </Box>
  ),
  args: { forumId: 4254 },
  play: playUnitTest(),
};

export const Mobile: MarkForumAsSpamStory = {
  render: (args) => (
    <Box width="360px">
      <MarkForumAsSpam {...args} isMobile />
    </Box>
  ),
  args: { ...Desktop.args },
  play: playUnitTest(true),
};

function playUnitTest(isMobile?: boolean) {
  return async () => {
    const reportButton = await screen.findByRole("button", {
      name: "Forum Mark as Spam",
    });

    expect(reportButton).toBeInTheDocument();

    const { modal, modalScreen } = await openModal(reportButton);

    if (!isMobile) {
      const closeButton = modalScreen.getByRole("button", {
        name: "Close",
      });
      expect(closeButton).toBeInTheDocument();
      userEvent.click(closeButton);
    }

    await openModal(reportButton);

    const declineButton = modalScreen.getByRole("button", {
      name: "Tidak",
    });
    expect(declineButton).toBeInTheDocument();
    userEvent.click(declineButton);

    await openModal(reportButton);

    const proceedButton = await modalScreen.findByRole("button", {
      name: "Ya, Laporkan",
    });
    expect(proceedButton).toBeInTheDocument();
    setTimeout(() => {
      userEvent.click(proceedButton);
    }, 500);

    expect(
      await screen.findByText("Terima kasih atas laporan Anda!")
    ).toBeInTheDocument();

    const confirmButton = await modalScreen.findByRole("button", {
      name: "OK",
    });
    expect(confirmButton).toBeInTheDocument();
    userEvent.click(confirmButton);

    setTimeout(() => {
      expect(modal).not.toBeInTheDocument();
    }, 500);
  };
}

async function openModal(reportButton: HTMLElement) {
  userEvent.click(reportButton);
  const modal = await screen.findByRole("dialog");
  const modalScreen = within(modal);

  expect(modal).toBeInTheDocument();
  expect(
    modalScreen.getByText(
      "Apakah Anda yakin melaporkan pertanyaan ini sebagai spam?"
    )
  ).toBeInTheDocument();

  return { modal, modalScreen: modalScreen };
}
