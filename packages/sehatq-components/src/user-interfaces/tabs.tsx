import React from "react";
import {
  Tabs as ChakraTabs,
  TabsProps as ChakraTabsProps,
  TabList as ChakraTabList,
  TabListProps as ChakraTabListProps,
  Tab as ChakraTab,
  TabProps as ChakraTabProps,
  TabPanels as ChakraTabPanels,
  TabPanelsProps as ChakraTabPanelsProps,
  TabPanel as ChakraTabPanel,
  TabPanelProps as ChakraTabPanelProps,
  forwardRef,
} from "@chakra-ui/react";
import { StripChakraProps } from "./utils";

export type TabsProps = StripChakraProps<ChakraTabsProps>;

export const Tabs = forwardRef<TabsProps, "div">((props: TabsProps, ref) => {
  return <ChakraTabs {...props} ref={ref} />;
});

Tabs.displayName = "Tabs";

export type TabListProps = StripChakraProps<ChakraTabListProps>;

export const TabList = forwardRef<TabListProps, "div">(
  (props: TabListProps, ref) => {
    return <ChakraTabList {...props} ref={ref} />;
  }
);

TabList.displayName = "TabList";

export type TabProps = StripChakraProps<ChakraTabProps>;

export const Tab = forwardRef<TabProps, "div">((props: TabProps, ref) => {
  return <ChakraTab {...props} ref={ref} />;
});

Tab.displayName = "Tab";

export type TabPanelsProps = StripChakraProps<ChakraTabPanelsProps>;

export const TabPanels = forwardRef<TabPanelsProps, "div">(
  (props: TabPanelsProps, ref) => {
    return <ChakraTabPanels {...props} ref={ref} />;
  }
);

TabPanels.displayName = "TabPanels";

export type TabPanelProps = StripChakraProps<ChakraTabPanelProps>;

export const TabPanel = forwardRef<TabPanelProps, "div">(
  (props: TabPanelProps, ref) => {
    return <ChakraTabPanel {...props} ref={ref} />;
  }
);

TabPanel.displayName = "TabPanel";
