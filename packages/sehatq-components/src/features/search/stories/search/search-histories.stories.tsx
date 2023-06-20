import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "jotai";
import { SearchHistories, searchHistoriesAtom } from "../..";
import { Box } from "../../../../user-interfaces";

export default {
  title: "Features / Search / Search Histories ",
  component: SearchHistories,
} as Meta;

type SearchHistoriesStory = StoryObj<unknown>;

export const Desktop: SearchHistoriesStory = {
  render: () => (
    <Box width="528px">
      <Provider
        initialValues={[
          [
            searchHistoriesAtom,
            [
              { id: "test", name: "test" },
              { id: "budia", name: "budia" },
            ],
          ],
        ]}
      >
        <SearchHistories />
      </Provider>
    </Box>
  ),
};

export const Mobile: SearchHistoriesStory = {
  render: () => (
    <Box width="360px">
      <Provider
        initialValues={[
          [
            searchHistoriesAtom,
            [
              { id: "test", name: "test" },
              { id: "budia", name: "budia" },
            ],
          ],
        ]}
      >
        <SearchHistories />
      </Provider>
    </Box>
  ),
  args: {
    isMobile: true,
  },
};
