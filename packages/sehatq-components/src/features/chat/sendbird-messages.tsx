import React, { useEffect, useRef, useState } from "react";
import { VirtuosoHandle } from "react-virtuoso";
import { useAtom } from "jotai";
import {
  GroupChannel,
  Sendbird,
  useGetInfiniteSendbirdMesssages,
} from "./sendbird-queries";
import { modelSendbirdBubble } from "./sendbird-model";
import { SendbirdMessagesDesktop } from "./sendbird-messages-desktop";
import { SendbirdMessagesMobile } from "./sendbird-messages-mobile";
import {
  selectedSendbirdMessageAtom,
  targetSendbirdMessageIdAtom,
} from "./sendbird-atoms";

export type SendbirdMessagesProps = {
  isMobile: boolean;
  channel: GroupChannel;
  sendbird: Sendbird;
  isHistory?: boolean;
  expireAt?: string;
  topElement?: React.ReactElement;
  verticalSpace?: {
    top?: number;
    bottom?: number;
  };
};

export function SendbirdMessages(props: SendbirdMessagesProps) {
  const {
    isMobile,
    channel,
    sendbird,
    isHistory,
    expireAt,
    topElement,
    verticalSpace,
  } = props;
  const [atomSelectedSendbirdMessage, setAtomSelectedSendbirdMessage] = useAtom(
    selectedSendbirdMessageAtom
  );

  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);
  const [isLoadingScroll, setLoadingScroll] = useState("");
  const [lastIndex, setLastIndex] = useState(0);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetInfiniteSendbirdMesssages(channel);
  const [atomTargetSendbirdMessageId, setAtomTargetSendbirdMessageId] = useAtom(
    targetSendbirdMessageIdAtom
  );
  const messages =
    data?.pages.reduce((messages, page) => [...page, ...messages], []) ?? [];

  const refLoadMoreConfig = useRef({
    called: false,
    firstItemIndex: 10000,
    prevMessageCount: messages.length,
  });
  const refVirtuoso = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    if (atomTargetSendbirdMessageId) {
      const messages =
        data?.pages.reduce((messages, page) => [...page, ...messages], []) ??
        [];

      const findIndex = messages.findIndex(
        (message) => message.messageId === atomTargetSendbirdMessageId
      );
      if (findIndex !== -1) {
        refVirtuoso.current?.scrollToIndex({
          index: findIndex,
          align: "end",
        });
        const intervalId = setInterval(() => {
          setAtomTargetSendbirdMessageId(null);
        }, 1500);
        return () => {
          clearInterval(intervalId);
        };
      } else if (hasNextPage) {
        fetchNextPage();
      } else {
        setAtomTargetSendbirdMessageId(null);
      }
    }
  }, [
    data,
    hasNextPage,
    fetchNextPage,
    atomTargetSendbirdMessageId,
    setAtomTargetSendbirdMessageId,
  ]);

  useEffect(() => {
    if (isLoadingScroll == "up" && !atTop) {
      fetchNextPage();
    }

    if (isLoadingScroll == "up" && atTop) {
      scrollTo("up");
      setLoadingScroll("");
    }

    if (isLoadingScroll == "down" && atBottom) {
      scrollTo("down");
      setLoadingScroll("");
    }
  }, [isLoadingScroll, atTop, fetchNextPage, atBottom]);

  function scrollTo(to: "up" | "down") {
    setLoadingScroll(to);
    refVirtuoso.current?.scrollToIndex({
      index: to == "up" ? 0 : refLoadMoreConfig.current.firstItemIndex,
      align: "end",
      behavior: "auto",
    });
  }

  // Maintain scroll position when load more messages, see https://virtuoso.dev/prepend-items
  if (
    refLoadMoreConfig.current.called &&
    messages.length > refLoadMoreConfig.current.prevMessageCount
  ) {
    refLoadMoreConfig.current.firstItemIndex =
      refLoadMoreConfig.current.firstItemIndex -
      (messages.length - refLoadMoreConfig.current.prevMessageCount);
    refLoadMoreConfig.current.called = false;
  }
  refLoadMoreConfig.current.prevMessageCount = messages.length;

  const bubbles = messages.map((message) => {
    const { createdAt } = message;
    const bubble = modelSendbirdBubble(message);
    const readStatus =
      channel.getUnreadMemberCount(message) > 0
        ? ("unread" as const)
        : ("read" as const);
    const type =
      message.sender.userId === sendbird.currentUser.userId
        ? ("receiver" as const)
        : ("sender" as const);
    const formatDate = new Date(createdAt);
    const messageTime = formatDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return {
      ...bubble,
      readStatus,
      messageTime,
      type,
      isSelected:
        message.messageId === atomSelectedSendbirdMessage?.messageId ||
        message.messageId === atomTargetSendbirdMessageId,
      onReply: () => {
        if (bubble.messageType === "image") {
          message.data = JSON.stringify({
            user_message_type: "image",
            image_url: bubble.imageUrl,
            image_alt: bubble.imageName,
          });
        }

        setAtomSelectedSendbirdMessage(message);
      },
      goToRepiledMessage:
        bubble.messageType === "text"
          ? () =>
              setAtomTargetSendbirdMessageId(bubble.replied?.messageId ?? null)
          : undefined,
    };
  });

  const otherProps = {
    messages: bubbles,
    pagination: {
      hasLoadMore: !atomTargetSendbirdMessageId && hasNextPage,
      isLoadingMore: isFetchingNextPage,
      loadMore: () => {
        fetchNextPage();
        refLoadMoreConfig.current.called = true;
      },
    },
    isTyping: channel.isTyping,
    markAsRead: async () => {
      await channel.markAsRead();
    },
    refVirtuoso: refVirtuoso,
    firstItemIndex: refLoadMoreConfig.current.firstItemIndex,
    verticalSpace,
    topElement,
    isHistory,
    expireAt,
    scrollTo,
    atTop,
    setAtTop,
    atBottom,
    setAtBottom,
    isLoadingScroll,
    setLoadingScroll,
    lastIndex,
    setLastIndex,
    scroll,
  };

  if (isMobile) {
    return <SendbirdMessagesMobile {...otherProps} />;
  }
  return <SendbirdMessagesDesktop {...otherProps} />;
}
