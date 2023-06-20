import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { createRealURL } from "@sehatq/utils";

import { URLS } from "@sehatq/constants";
import {
  within,
  userEvent,
  screen,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { PartialDeep } from "type-fest";
import { HealthToolScoreList, HealthToolScoreListProps } from "..";
import { HealthToolScoreListResponse } from "../health-tools-model";
import { Box } from "../../../user-interfaces";
import {
  generateFakeHealthScoreList,
  getHealthScoreList,
} from "../msw-handlers";

const withLoadMorePreview: PartialDeep<HealthToolScoreListResponse> = {
  meta: {
    healthTool: {
      name: "Tes Kesehatan Mental",
    },
    pagination: {
      total: 16,
    },
  },
};

const withNoLoadMorePreview: PartialDeep<HealthToolScoreListResponse> = {
  meta: {
    healthTool: {
      name: "Tes Kesehatan Mental",
    },
    pagination: {
      total: 6,
    },
  },
};
const withEmptyStatePreview: PartialDeep<HealthToolScoreListResponse> = {
  data: [],
  meta: {
    pagination: {
      total: 0,
    },
  },
};

function healthToolCardAssertion(
  screen: ReturnType<typeof within>,
  scoreItem: HealthToolScoreListResponse["data"][number],
  index: number,
  healthToolSlug: string
) {
  expect(screen.getAllByText(scoreItem.healthToolName)[0]).toBeInTheDocument();
  expect(screen.getByText(scoreItem.diagnosisName)).toBeInTheDocument();
  expect(screen.getByText(scoreItem.description)).toBeInTheDocument();
  const healthToolCardLink = screen.getAllByRole("link", {
    name: "Lihat Detail",
  })[index];
  expect(healthToolCardLink).toBeInTheDocument();
  const { userId } = healthToolScoreListArgs;
  expect(healthToolCardLink.getAttribute("href")).toEqual(
    `${createRealURL(URLS.PROFILE_HEALTHRECORD_DETAIL_SCORE, {
      slug: [healthToolSlug],
      scoreId: [scoreItem.id + ""],
      userId,
    })}`
  );
}

function healthToolDateRangeAssertion(
  screen: ReturnType<typeof within>,
  chip: { label: string; value: string }
) {
  expect(screen.getByRole("button", { name: chip.label })).toBeInTheDocument();
}

export default {
  title: "Features / Health Tool / Score List",
  component: HealthToolScoreList,
} as Meta;

type HealthToolScoreListStory = StoryObj<HealthToolScoreListProps>;

const healthToolScoreListArgs = {
  userId: "15150",
  healthToolSlug: "testing-1-dec",
};

export const Desktop: HealthToolScoreListStory = {
  render: (args) => (
    <Box width="1080px">
      <HealthToolScoreList {...args} />
    </Box>
  ),
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withNoLoadMorePreview)],
    },
  },
  args: {
    isMobile: false,
    ...healthToolScoreListArgs,
  },
  play: playUnitTest(),
};

export const DesktopWithEmptyState: HealthToolScoreListStory = {
  ...Desktop,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withEmptyStatePreview)],
    },
  },
  play: playUnitTestEmptyState(),
};

export const DesktopWithLoadMore: HealthToolScoreListStory = {
  ...Desktop,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withLoadMorePreview)],
    },
  },
  play: playUnitTestLoadMore(),
};

export const DesktopWithSelectDateRange: HealthToolScoreListStory = {
  ...Desktop,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withNoLoadMorePreview)],
    },
  },
  play: playUnitTestSelectDateRange(),
};

export const Mobile: HealthToolScoreListStory = {
  render: (args) => (
    <Box width="360px">
      <HealthToolScoreList {...args} />
    </Box>
  ),
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withNoLoadMorePreview)],
    },
  },
  args: {
    isMobile: true,
    ...healthToolScoreListArgs,
  },
  play: playUnitTest(true),
};

export const MobileWithEmptyState: HealthToolScoreListStory = {
  ...Mobile,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withEmptyStatePreview)],
    },
  },
  play: playUnitTestEmptyState(),
};

export const MobileWithSelectDateRange: HealthToolScoreListStory = {
  ...Mobile,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withNoLoadMorePreview)],
    },
  },
  play: playUnitTestSelectDateRange(),
};

export const MobileWithLoadMore: HealthToolScoreListStory = {
  ...Mobile,
  parameters: {
    msw: {
      handlers: [getHealthScoreList(withLoadMorePreview)],
    },
  },
  play: playUnitTestLoadMore(),
};

function playUnitTest(isMobile = false) {
  return async () => {
    const query = {
      page: "1",
      perPage: "10",
      userId: "15150",
    };

    const { data, meta } = generateFakeHealthScoreList(
      query,
      withNoLoadMorePreview
    );
    await screen.findByText("Semua");
    expect(await screen.findByText(data[0].description)).toBeInTheDocument();

    // card assertion
    data.forEach((scoreItem, index) => {
      healthToolCardAssertion(screen, scoreItem, index, meta.healthTool.slug);
    });

    // date range chips assertion
    meta.filters.dateRange.forEach((chip) => {
      healthToolDateRangeAssertion(screen, chip);
    });

    // delete assertion
    const deleteIcon = screen.getAllByLabelText("delete")[0];
    userEvent.click(deleteIcon);

    const modal = await screen.findByRole("dialog");
    const modalScreen = within(modal);

    expect(
      modalScreen.getByText("Hapus Catatan Kesehatan?")
    ).toBeInTheDocument();
    expect(
      modalScreen.getByText(
        "Catatan yang sudah dihapus tidak dapat dikembalikan"
      )
    ).toBeInTheDocument();

    const deleteButton = await modalScreen.findByRole("button", {
      name: isMobile ? "Ya, Hapus" : "Hapus",
    });
    const cancelButton = await modalScreen.findByRole("button", {
      name: "Batal",
    });
    expect(deleteButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    userEvent.click(cancelButton);
    await waitForElementToBeRemoved(modal);
    expect(modal).not.toBeInTheDocument();
  };
}

function playUnitTestEmptyState() {
  return async () => {
    const query = {
      page: "1",
      perPage: "10",
      userId: "15150",
    };
    const { meta } = generateFakeHealthScoreList(query, withEmptyStatePreview);
    const { filters, healthTool } = meta;
    await screen.findByText("Semua");

    filters.dateRange.forEach((chip) => {
      healthToolDateRangeAssertion(screen, chip);
    });
    expect(
      await screen.findByText(
        "Cek dan dapatkan gambaran kondisi kesehatanmu saat ini"
      )
    ).toBeInTheDocument();
    const ctaLink = await screen.findByRole("link", {
      name: "Mulai Cek Kesehatan",
    });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.getAttribute("href")).toEqual(
      `${createRealURL(URLS.HEALTH_TOOL_DETAIL, { slug: [healthTool.slug] })}`
    );
  };
}

function playUnitTestLoadMore() {
  return async () => {
    const query = {
      page: "1",
      perPage: "10",
      userId: "15150",
    };
    const loadMoreQuery = {
      page: "2",
      perPage: "10",
      userId: "15150",
    };
    const { data, meta } = generateFakeHealthScoreList(
      query,
      withLoadMorePreview
    );
    const { data: dataLoadMore } = generateFakeHealthScoreList(
      loadMoreQuery,
      withLoadMorePreview
    );
    data.push(...dataLoadMore);

    await screen.findByText("Semua");
    expect(await screen.findByText(data[0].description)).toBeInTheDocument();

    const loadMoreButton = await screen.findByRole("button", {
      name: "Show More",
    });
    expect(loadMoreButton).toBeInTheDocument();
    userEvent.click(loadMoreButton);
    await screen.findByText(data[10].description);
    data.forEach((scoreItem, index) => {
      healthToolCardAssertion(screen, scoreItem, index, meta.healthTool.slug);
    });
    expect(loadMoreButton).not.toBeInTheDocument();
  };
}

function playUnitTestSelectDateRange() {
  return async () => {
    const selectDateRangeQuery = {
      page: "1",
      perPage: "10",
      userId: "15150",
      dateRange: "last_months",
    };
    const { data: dataSelectDateRange, meta } = generateFakeHealthScoreList(
      selectDateRangeQuery,
      withNoLoadMorePreview
    );
    await screen.findByText("Semua");
    const selectDateRangeButton = await screen.findByRole("button", {
      name: "1 bulan terakhir",
    });
    expect(selectDateRangeButton).toBeInTheDocument();
    userEvent.click(selectDateRangeButton);

    await screen.findByText(dataSelectDateRange[0].description);
    dataSelectDateRange.forEach((scoreItem, index) => {
      healthToolCardAssertion(screen, scoreItem, index, meta.healthTool.slug);
    });
  };
}
