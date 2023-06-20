import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import {
  RegularTelemedicineClosedPopup,
  RegularTelemedicineClosedPopupProps,
} from "..";

export default {
  title: "Features / Telemedicine / Regular Telemedicine Closed Popup",
  component: RegularTelemedicineClosedPopup,
} as Meta;

type RegularTelemedicineClosedPopupStory =
  StoryObj<RegularTelemedicineClosedPopupProps>;

export const Desktop: RegularTelemedicineClosedPopupStory = {
  render: (args) => (
    <Box width="1086px">
      <RegularTelemedicineClosedPopup {...args} isMobile={false} />
    </Box>
  ),
  args: {
    isOpenTelemedicineInfo: true,
    onCloseTelemedicineInfo: () => null,
  },
};

export const Mobile: RegularTelemedicineClosedPopupStory = {
  render: (args) => (
    <Box width="360px">
      <RegularTelemedicineClosedPopup {...args} isMobile />
    </Box>
  ),
  args: {
    ...Desktop.args,
  },
};
