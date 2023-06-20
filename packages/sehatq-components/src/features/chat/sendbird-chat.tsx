import React, {
  ReactElement,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { GroupChannelHandler } from "@sendbird/chat/groupChannel";
import {
  useGetSendbird,
  useGetSendbirdUser,
  useGetSendbirdChannel,
  useSendSendbirdMessage,
  SendbirdMessage,
} from "./sendbird-queries";
import { modelSendbirdBubble } from "./sendbird-model";
import { SendbirdChatMobile } from "./sendbird-chat-mobile";
import { SendbirdChatDesktop } from "./sendbird-chat-desktop";

export type SendbirdAction = {
  endChat: () => void;
};

export type SendbirdChatProps = {
  isMobile?: boolean;
  appId: string;
  userId: string;
  channelUrl: string;
  accessToken: string;
  doctor: {
    name: string;
    speciality: string;
    slug: string;
    imageUrl: string;
  };
  countDown?: {
    startCount: number;
    tickCallback?: (count: number) => void;
  };
  onChatEnded?: (by: "receiver" | "sender") => void;
  header?: {
    canVideoCall?: boolean;
    showVideoCallIcon?: boolean;
    leftElement?: ReactElement;
    rightElement?: ReactElement;
    bottomElement?: ReactElement;
  };
  messages?: {
    verticalSpace?: {
      top?: number;
      bottom?: number;
    };
    topElement?: React.ReactElement;
  };
  isHistory?: boolean;
  expireAt?: string;
};

export const SendbirdChat = forwardRef<SendbirdAction, SendbirdChatProps>(
  (props: SendbirdChatProps, ref) => {
    const {
      isMobile,
      appId,
      userId,
      accessToken,
      channelUrl,
      doctor,
      header,
      isHistory,
      expireAt,
      onChatEnded,
      countDown,
      messages,
    } = props;
    const { data: sb } = useGetSendbird(appId);
    const refOnChatEnded = useRef(onChatEnded);
    const { isSuccess: isConnected } = useGetSendbirdUser(sb, {
      userId,
      accessToken,
    });
    const { data: channel } = useGetSendbirdChannel(
      isConnected ? sb : undefined,
      channelUrl
    );
    const { mutate: sendSendbirdMessage } = useSendSendbirdMessage();

    const consultationId = channel?.url.split("_")[1];

    useImperativeHandle(ref, () => ({
      endChat,
    }));

    function endChat() {
      if (channel) {
        const data = {
          consultationId,
          user_message_type: "chat_ended",
          ended_by: "user",
        };
        sendSendbirdMessage(
          {
            channel,
            message: `Chat closed by ${sb?.currentUser.nickname}`,
            data: JSON.stringify(data),
          },
          {
            onSuccess: () => {
              onChatEnded?.("receiver");
            },
          }
        );
      }
    }

    refOnChatEnded.current = onChatEnded;
    useEffect(() => {
      if (sb) {
        const channelHandlerId = "on-chat-ended";
        const channelHandler = new GroupChannelHandler();
        channelHandler.onMessageReceived = (_, newMessage) => {
          const bubble = modelSendbirdBubble(newMessage as SendbirdMessage);
          if (bubble.messageType === "chat-ended" && refOnChatEnded.current) {
            refOnChatEnded.current("sender");
          }
        };
        sb.groupChannel.addGroupChannelHandler(
          channelHandlerId,
          channelHandler
        );
        return () => {
          sb.groupChannel.removeGroupChannelHandler(channelHandlerId);
        };
      }
    }, [sb]);

    const otherProps = {
      appId,
      userId,
      doctor,
      channel,
      accessToken,
      sendbird: sb,
      header,
      isHistory,
      expireAt,
      countDown,
      messages,
    };

    if (isMobile) {
      return <SendbirdChatMobile {...otherProps} />;
    }
    return <SendbirdChatDesktop {...otherProps} />;
  }
);

SendbirdChat.displayName = "SendbirdChat";
