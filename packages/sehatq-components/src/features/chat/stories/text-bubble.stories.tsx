import React from "react";

import { Meta, StoryObj } from "@storybook/react";

import {
  TextBubble,
  TextBubbleProps,
  BubbleContainer,
  BubbleContainerProps,
} from "..";

export default {
  title: "Features / Chat / Text Bubble",
  component: TextBubble,
} as Meta;

type TextBubbleStory = StoryObj<TextBubbleProps & BubbleContainerProps>;

export const DesktopSender: TextBubbleStory = {
  render: (args) => (
    <BubbleContainer {...args}>
      <TextBubble {...args} />
    </BubbleContainer>
  ),
  args: {
    type: "sender",
    readStatus: "unread",
    messageText:
      "Gimana pak Arief, ada gejala apa atau informasi apa yang bisa saya bantu?",
    messageTime: "1:15 PM",
  },
};

export const MobileSender: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopSender.args,
    messageText: "Hi Arief, saya dr. Woro ada yang bisa saya bantu?",
    isMobile: true,
  },
};

export const DesktopSenderReplied: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopSender.args,
    readStatus: "read",
    messageText:
      "Bisa jelaskan lebih detil gejalanya seperti apa? apa batuknya berdahak?",
    replied: {
      messageId: 1,
      messageText: "Cuma kali ini gak pengaruh dok",
      messageSender: "Kamu",
    },
    messageTime: "1:15 PM",
  },
};

export const MobileSenderReplied: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopSenderReplied.args,
    messageText: "Hi Arief, saya dr. Gerald ada yang bisa saya bantu?",
    replied: {
      messageId: 1,
      messageText:
        "Hi Dok, saya sudah beberapa hari ini menderita radang tenggorokan yang lumayan ganggu. Saya sudah konsumsi obat batuk Ibu & Anak dan biasanya selalu efektif",
      messageSender: "Kamu",
    },
    isMobile: true,
  },
};

export const DesktopReceiver: TextBubbleStory = {
  ...DesktopSender,
  args: {
    type: "receiver",
    readStatus: "read",
    messageText: "Jadi gini dok",
    messageTime: "1:15 PM",
  },
};

export const MobileReceiver: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopReceiver.args,
    messageText: "Selamat sore dok",
    isMobile: true,
  },
};

export const DesktopReceiverReplied: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopReceiver.args,
    readStatus: "unread",
    messageText:
      "Hi Dok, saya sudah beberapa hari ini menderita radang tenggorokan yang lumayan ganggu. Saya sudah konsumsi obat batuk Ibu & Anak dan biasanya selalu efektif",
    replied: {
      messageId: 2,
      messageText: "Hi Arief, saya dr. Gerald ada yang bisa saya bantu?",
      messageSender: "dr. Gerald Toreh, Sp.PD",
    },
  },
};

export const MobileReceiverReplied: TextBubbleStory = {
  ...DesktopSender,
  args: {
    ...DesktopReceiverReplied.args,
    messageText:
      "Parah si dok, dahak sampe berdarah, kira-kiira saya bisa selamat gak ya dok?",
    replied: {
      messageId: 2,
      messageText:
        "Bisa jelaskan lebih detil gejalanya seperti apa? apa batuknya berdahak?",
      messageSender: "Woro Kurnianingrum, M.Psi",
    },
    isMobile: true,
  },
};
