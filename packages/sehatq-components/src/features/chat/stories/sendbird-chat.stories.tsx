import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { SendbirdChat, SendbirdChatProps } from "..";
import { Box, Flex, NoteIcon, Text } from "../../../user-interfaces";

export default {
  title: "Features / Chat / Sendbird Chat",
  component: SendbirdChat,
} as Meta;

type SendbirdChatStory = StoryObj<SendbirdChatProps>;

export const Desktop: SendbirdChatStory = {
  render: (args) => (
    <Box height="780px" width="720px">
      <SendbirdChat {...args} />
    </Box>
  ),
  args: {
    appId: "568BA7B1-36BB-465D-873C-F343699B80DB",
    userId: "p10288",
    accessToken: "faeba82556581fe3538310ce47b163bf25de59ac",
    channelUrl: "consultation_13272_1657587723",
    countDown: {
      startCount: 1000,
    },
    doctor: {
      name: "dr. Adriandi, Sp.M",
      speciality: "Psikolog",
      imageUrl:
        "https://cms.sehatq.com/cdn-cgi/image/f=auto,width=96,fit=pad,background=white,quality=100/public/img/doctor_img/dr-rani-indira-sari-sp-m.jpg",
    },
  },
};

export const Mobile: SendbirdChatStory = {
  render: (args) => (
    <Box height="565px" width="360px">
      <SendbirdChat {...args} />
    </Box>
  ),
  args: {
    ...Desktop.args,
    isMobile: true,
    messages: {
      topElement: (
        <Box paddingX={5} paddingY={1.5}>
          <Box
            borderRadius="lg"
            paddingY={4}
            paddingX={3}
            border="0.5px solid"
            borderColor="veryLightPink"
            backgroundColor="white"
          >
            <Flex align="center" marginBottom={2}>
              <NoteIcon size="16px" height="16px" marginRight={2} />
              <Text fontFamily="poppins" fontWeight="bold" fontSize="md">
                Keluhan
              </Text>
            </Flex>
            <Text fontSize="sm">
              diare dari semalaman, sakit perut nyembelit sampe gabisa tidur
            </Text>
          </Box>
        </Box>
      ),
    },
  },
};
