import React, {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import { useAtom } from "jotai";
import { SendbirdTextInputDesktop } from "./sendbird-text-input-desktop";
import { SendbirdTextInputMobile } from "./sendbird-text-input-mobile";
import { useSendSendbirdMessage, GroupChannel } from "./sendbird-queries";
import { selectedSendbirdMessageAtom } from "./sendbird-atoms";
import { getCustomeMessage } from "./sendbird-model";

export type SendbirdTextInputProps = {
  isMobile?: boolean;
  channel?: GroupChannel;
};

export function SendbirdTextInput(props: SendbirdTextInputProps) {
  const { isMobile, channel } = props;
  const [message, setMessage] = useState("");
  const prevMessage = useRef("");
  const [atomSelectedSendbirdMessage, setAtomSelectedSendbirdMessage] = useAtom(
    selectedSendbirdMessageAtom
  );
  const { mutate: sendSendbirdMessage } = useSendSendbirdMessage();

  useEffect(() => {
    if (channel && prevMessage.current !== message) {
      channel.startTyping();
      const timeoutId = setTimeout(() => {
        channel.endTyping();
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    } else if (channel) {
      channel.endTyping();
    }
  }, [message, channel]);

  const consultationId = channel?.url.split("_")[1];

  function handleSubmitMessage(event: FormEvent) {
    event.preventDefault();
    if (channel && message) {
      const data = {
        consultationId,
        user_message_type: "text_message",
        replied_message:
          atomSelectedSendbirdMessage &&
          getCustomeMessage(atomSelectedSendbirdMessage)
            ? {
                id: atomSelectedSendbirdMessage.messageId,
                message: getCustomeMessage(atomSelectedSendbirdMessage),
                name: atomSelectedSendbirdMessage.sender.nickname,
                type: atomSelectedSendbirdMessage.data
                  ? JSON.parse(
                      atomSelectedSendbirdMessage.data
                    ).user_message_type?.toLowerCase()
                  : "text_message",
                time_stamp: atomSelectedSendbirdMessage.createdAt,
              }
            : null,
      };
      sendSendbirdMessage(
        {
          channel,
          message,
          data: JSON.stringify(data),
        },
        {
          onSuccess: () => {
            setMessage("");
            setAtomSelectedSendbirdMessage(null);
          },
        }
      );
    }
  }

  function handleChangeMessage(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setMessage(event.currentTarget.value);
  }

  const otherProps = {
    handleSubmitMessage,
    handleChangeMessage,
    message,
    isReplied: !!atomSelectedSendbirdMessage,
  };

  if (isMobile) {
    return <SendbirdTextInputMobile {...otherProps} />;
  }
  return <SendbirdTextInputDesktop {...otherProps} />;
}
