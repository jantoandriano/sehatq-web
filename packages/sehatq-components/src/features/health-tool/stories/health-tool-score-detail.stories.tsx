import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { createRealURL } from "@sehatq/utils";
import { URLS } from "@sehatq/constants";
import { Box } from "../../../user-interfaces";
import { HealthToolScoreDetail, HealthToolScoreDetailProps } from "..";
import {
  getHealthToolScoreDetail,
  generateFakeHealthToolScoreDetail,
} from "../msw-handlers";

export default {
  title: "Features / Health Tool / Health Tool Score Detail",
  component: HealthToolScoreDetail,
  parameters: {
    msw: {
      handlers: [getHealthToolScoreDetail],
    },
  },
} as Meta;

type HealthToolScoreDetailStory = StoryObj<HealthToolScoreDetailProps>;

const defaultArgs = {
  scoreId: "1",
  slug: "test-slug",
};

export const Desktop: HealthToolScoreDetailStory = {
  render: (args) => (
    <Box width="700px">
      <HealthToolScoreDetail {...args} isMobile={false} />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
  play: playUnitTest(),
};

export const Mobile: HealthToolScoreDetailStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolScoreDetail {...args} isMobile />
    </Box>
  ),
  args: {
    ...defaultArgs,
  },
  play: playUnitTest(),
};

function playUnitTest() {
  return async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const { data } = generateFakeHealthToolScoreDetail({
      healthToolsIdOrSlug: defaultArgs.slug,
      id: defaultArgs.scoreId,
    });

    const image = canvas.getByRole<HTMLImageElement>("img");
    expect(image).toBeInTheDocument();
    await waitFor(() => {
      expect(image).toHaveAttribute("src", data.iconUrl);
    });

    const diagnosisTitleText = canvas.getByText<HTMLParagraphElement>(
      data.diagnosisTitle
    );
    expect(diagnosisTitleText).toBeInTheDocument();

    const diagnosisNameText = canvas.getByText<HTMLParagraphElement>(
      data.diagnosisName
    );
    expect(diagnosisNameText).toBeInTheDocument();
    expect(diagnosisNameText).toHaveStyle(`color: ${data.descriptionColor}`);

    const descriptionText = canvas.getByText<HTMLParagraphElement>(
      data.description
    );
    expect(descriptionText).toBeInTheDocument();

    const recommendationText =
      canvas.getByText<HTMLParagraphElement>("Rekomendasi:");
    expect(recommendationText).toBeInTheDocument();
    expect(recommendationText.nextElementSibling).toContainHTML(
      data.recommendation
    );

    const linkButton = canvas.getByRole<HTMLAnchorElement>("link");
    expect(linkButton).toBeInTheDocument();
    expect(linkButton).toHaveTextContent(data.recommendationButtonText);
    expect(linkButton).toHaveAttribute("href");
    expect(linkButton.getAttribute("href")).toBe(
      createRealURL(URLS.TELEMED_HCPS, {
        slugs: [data.recommendationSlug],
      })
    );
  };
}
