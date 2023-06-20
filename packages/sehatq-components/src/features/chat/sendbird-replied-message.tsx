import React from "react";
import { useAtom } from "jotai";
import { SendbirdRepliedMessageDesktop } from "./sendbird-replied-message-desktop";
import { SendbirdRepliedMessageMobile } from "./sendbird-replied-message-mobile";
import { Sendbird } from "./sendbird-queries";
import {
  selectedSendbirdMessageAtom,
  targetSendbirdMessageIdAtom,
} from "./sendbird-atoms";
import { getCustomeMessage } from "./sendbird-model";

export type SendbirdRepliedMessageProps = {
  isMobile?: boolean;
  sendbird?: Sendbird;
};

export function SendbirdRepliedMessage(props: SendbirdRepliedMessageProps) {
  const { isMobile, sendbird } = props;
  const [atomSelectedSendbirdMessage, setAtomSelectedSendbirdMessage] = useAtom(
    selectedSendbirdMessageAtom
  );

  const [, setAtomTargetSendbirdMessageId] = useAtom(
    targetSendbirdMessageIdAtom
  );

  if (!atomSelectedSendbirdMessage) {
    return null;
  }
  function gotoMessage() {
    setAtomTargetSendbirdMessageId(
      atomSelectedSendbirdMessage?.messageId ?? null
    );
  }
  function resetSelectedSendbirdMessage() {
    setAtomSelectedSendbirdMessage(null);
  }

  const { data } = atomSelectedSendbirdMessage;
  let messageData = null;
  if (data) {
    messageData = JSON.parse(data);
  }

  const otherProps = {
    id: atomSelectedSendbirdMessage.messageId,
    message: getCustomeMessage(atomSelectedSendbirdMessage),
    name:
      atomSelectedSendbirdMessage.sender.userId === sendbird?.currentUser.userId
        ? "Kamu"
        : "Dokter",
    type: atomSelectedSendbirdMessage.data
      ? JSON.parse(
          atomSelectedSendbirdMessage.data
        ).user_message_type?.toLowerCase()
      : "text_message",
    timeStamp: atomSelectedSendbirdMessage.createdAt,
    resetSelectedSendbirdMessage,
    gotoMessage,
    ...(data && messageData.image_url
      ? {
          imageUrl: messageData.image_url,
          imageAlt: messageData.image_alt,
        }
      : null),
  };

  if (isMobile) {
    return <SendbirdRepliedMessageMobile {...otherProps} />;
  }
  return <SendbirdRepliedMessageDesktop {...otherProps} />;
}
