import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Flex } from "../../../user-interfaces";
import { ConsultationIntro, ConsultationIntroProps } from "..";

export default {
  title: "Features / Telemedicine / Consultation Intro ",
  component: ConsultationIntro,
} as Meta;

type ConsultationIntroStory = StoryObj<ConsultationIntroProps>;

export const Desktop: ConsultationIntroStory = {
  render: (args) => (
    <Flex direction="column" width="720px" background="iceBlue.500">
      <ConsultationIntro {...args} />
    </Flex>
  ),
  args: {
    symptom: "diare dari semalaman, sakit perut nyembelit sampe gabisa tidur",
    patientName: "Arief",
    doctor: {
      name: "dr. Gerald Toreh, Sp.PD",
      imageUrl:
        "https://s3.ap-southeast-1.amazonaws.com/static.sehatq.com/telemed/profile/telemedregularchatphoto.jpg",
    },
    startedAt: "1:15 PM",
  },
};

export const Mobile: ConsultationIntroStory = {
  render: (args) => (
    <Flex direction="column" width="360px" background="iceBlue.500">
      <ConsultationIntro {...args} />
    </Flex>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
  },
};
