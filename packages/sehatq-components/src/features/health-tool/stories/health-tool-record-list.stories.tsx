import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { createRealURL } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import {
  HealthToolRecordList,
  HealthToolRecordListProps,
} from "../health-tool-record-list";
import {
  generateFakeHealthRecordList,
  getHealthRecordList,
} from "../msw-handlers";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Health Tool / Record List",
  component: HealthToolRecordList,
  parameters: {
    msw: {
      handlers: [getHealthRecordList],
    },
  },
} as Meta;

type HealthToolRecordListStory = StoryObj<HealthToolRecordListProps>;

export const Desktop: HealthToolRecordListStory = {
  render: (args) => (
    <Box width="1080px">
      <HealthToolRecordList {...args} />
    </Box>
  ),
  args: {
    isMobile: false,
    userId: "1",
  },
  play: playUnitTest(),
};

export const Mobile: HealthToolRecordListStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolRecordList {...args} />
    </Box>
  ),
  args: {
    isMobile: true,
    userId: "1",
  },
  play: playUnitTest(),
};

function playUnitTest() {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const query = {
      page: "1",
      perPage: "10",
      keyword: "",
    };
    const { data } = generateFakeHealthRecordList(query);
    const canvas = within(canvasElement);

    const [anchorBtns, images] = await Promise.all([
      canvas.findAllByRole<HTMLAnchorElement>("link"),
      canvas.findAllByRole<HTMLImageElement>("img"),
    ]);

    data.forEach((item) => {
      const foundAnchor: HTMLAnchorElement | undefined = anchorBtns.find(
        (a) =>
          a.getAttribute("href") ===
          createRealURL(URLS.PROFILE_HEALTH_TOOL_SCORE_LIST, {
            healthToolSlug: item.slug,
            userId: "1",
          })
      );
      expect(foundAnchor).toBeInTheDocument();

      const textEl = canvas.getByText<HTMLAnchorElement>(item.title);
      expect(textEl).toBeInTheDocument();

      const foundImg: HTMLImageElement | undefined = images.find(
        (img) => img.getAttribute("src") === item.iconUrl
      );
      expect(foundImg).toBeInTheDocument();
    });
  };
}
