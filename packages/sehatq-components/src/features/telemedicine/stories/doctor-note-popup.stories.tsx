import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Box } from "../../../user-interfaces";
import { DoctorNotePopup, DoctorNotePopupProps } from "..";

export default {
  title: "Features / Telemedicine / Doctor Note Popup",
  component: DoctorNotePopup,
} as Meta;

type DoctorNotePopupStory = StoryObj<DoctorNotePopupProps>;

export const Desktop: DoctorNotePopupStory = {
  render: (args) => (
    <Box width="777px">
      <DoctorNotePopup {...args} />
    </Box>
  ),
  args: {
    consultationId: "13003",
    isOpen: true,
    onClose: () => console.log("call onCloseDoctorNote"),
  },
};

export const Mobile: DoctorNotePopupStory = {
  render: (args) => (
    <Box width="328px" height="616px">
      <DoctorNotePopup {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
