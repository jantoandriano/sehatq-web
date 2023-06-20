import { addons, types } from "@storybook/addons";
import {
  StorybookNavigationPanel,
  NAVIGATION_ADDON_ID,
  NAVIGATION_PANEL_ID,
} from "./component";

addons.register(NAVIGATION_ADDON_ID, () => {
  // Register the panel
  addons.add(NAVIGATION_PANEL_ID, {
    type: types.PANEL,
    title: "Navigation",
    match: ({ viewMode }) => viewMode === "story",
    render: StorybookNavigationPanel,
  });
});
