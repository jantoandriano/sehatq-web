import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { MyTelemedicines, MyTelemedicinesProps } from "..";
import { Box } from "../../../user-interfaces";

export default {
  title: "Features / Profile / My Telemedicines",
  component: MyTelemedicines,
} as Meta;

type MyTelemedicinesStory = StoryObj<MyTelemedicinesProps>;

export const Desktop: MyTelemedicinesStory = {
  render: (args) => (
    <Box overflowY="auto">
      <MyTelemedicines {...args} />
    </Box>
  ),
  args: {
    userId: "",
  },
};

export const Mobile: MyTelemedicinesStory = {
  ...Desktop,
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
