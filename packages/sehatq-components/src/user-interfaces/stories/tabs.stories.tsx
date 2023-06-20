import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsProps, TabList, TabPanels, Tab, TabPanel, Box } from "..";

export default {
  title: "UI / Tabs",
  component: Tabs,
} as Meta;

// Create an array of data
const tabData = [
  {
    label: "Chat",
    content: "Isi dari tab Chat.",
  },
  {
    label: "Booking",
    content: "Isi dari tab Booking.",
  },
  {
    label: "Layanan Pemeriksaan",
    content: "Isi dari tab Layanan Pemeriksaan.",
  },
];

type TabsStory = StoryObj<TabsProps>;

export const Basic: TabsStory = {
  render: (args) => (
    <Box>
      <Tabs {...args} />
    </Box>
  ),
  args: {
    children: (
      <>
        <TabList>
          {tabData.map((tab) => (
            <Tab key={tab.label}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabData.map((tab) => (
            <TabPanel p={4} key={tab.label}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </>
    ),
    colorScheme: "blue",
  },
};
