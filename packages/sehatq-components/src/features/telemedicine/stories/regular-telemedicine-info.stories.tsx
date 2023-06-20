import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { RegularTelemedicineInfo, RegularTelemedicineInfoProps } from "..";

export default {
  title: "Features / Telemedicine / Regular Telemedicine Info",
  component: RegularTelemedicineInfo,
} as Meta;

type RegularTelemedicineInfoStory = StoryObj<RegularTelemedicineInfoProps>;

export const Desktop: RegularTelemedicineInfoStory = {
  render: (args) => (
    <Box width="1086px">
      <RegularTelemedicineInfo {...args} isMobile={false} />
    </Box>
  ),
  args: {
    allowFreeChat: false,
  },
};

export const Mobile: RegularTelemedicineInfoStory = {
  render: (args) => (
    <Box width="360px">
      <RegularTelemedicineInfo {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
    isOpenTelemedicineInfo: true,
    onCloseTelemedicineInfo: () => null,
  },
};
