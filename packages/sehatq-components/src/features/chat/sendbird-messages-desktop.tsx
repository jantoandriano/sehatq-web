import React, { RefObject } from "react";
import { VirtuosoHandle, Virtuoso } from "react-virtuoso";
import { DistributiveOmit } from "@sehatq/utils";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Text,
} from "../../user-interfaces";
import { SendbirdBubble, SendbirdBubbleProps } from "./sendbird-bubble";
import { SendbirdTypingIndicator } from "./sendbird-typing-indicator";

export type SendbirdMessagesDesktopProps = {
  messages: DistributiveOmit<SendbirdBubbleProps, "isMobile">[];
  isTyping: boolean;
  markAsRead: () => Promise<void>;
  pagination: {
    loadMore: () => void;
    isLoadingMore: boolean;
    hasLoadMore?: boolean;
  };
  refVirtuoso: RefObject<VirtuosoHandle>;
  firstItemIndex: number;
  topElement?: React.ReactElement;
  verticalSpace?: {
    top?: number;
    bottom?: number;
  };
  isHistory?: boolean;
  expireAt?: string;
  scrollTo: (to: "up" | "down") => void;
  setAtTop: React.Dispatch<React.SetStateAction<boolean>>;
  atTop: boolean;
  setAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
  atBottom: boolean;
  isLoadingScroll: string;
  setLoadingScroll: (to: "up" | "down" | "") => void;
  lastIndex: number;
  setLastIndex: (index: number) => void;
};

export function SendbirdMessagesDesktop(props: SendbirdMessagesDesktopProps) {
  const {
    messages,
    isTyping,
    pagination,
    markAsRead,
    refVirtuoso,
    firstItemIndex,
    verticalSpace,
    topElement,
    isHistory,
    expireAt,
    scrollTo,
    setAtBottom,
    atBottom,
    atTop,
    setAtTop,
    isLoadingScroll,
    setLoadingScroll,
    lastIndex,
    setLastIndex,
  } = props;

  return (
    <>
      {!atTop && isLoadingScroll === "up" ? (
        <Flex
          position="absolute"
          top={verticalSpace?.top ? "110px" : "75px"}
          width="full"
          justifyContent="center"
        >
          <Button
            px={2}
            leftIcon={<ArrowUpIcon boxSize="16px" />}
            borderRadius="full"
            width="137px"
            height="30px"
            colorScheme="paleBlue"
            background="paleBlue.500"
            boxShadow="base"
            color="sea.500"
            zIndex="docked"
            fontWeight="semibold"
            fontSize="sm"
            onClick={() => scrollTo("up")}
          >
            Scroll ke atas
          </Button>
        </Flex>
      ) : null}
      <Virtuoso
        context={{
          isTyping,
          topElement,
          isHistory,
          expireAt,
          verticalSpace,
          hasLoadMore: pagination.hasLoadMore,
        }}
        ref={refVirtuoso}
        data={messages}
        itemContent={(index, message) => {
          return <SendbirdBubble isMobile={false} {...message} />;
        }}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={20}
        followOutput="smooth"
        style={{
          flex: 1,
          minHeight: "0px",
          width: "100%",
        }}
        components={{ Header, Footer }}
        startReached={pagination.hasLoadMore ? pagination.loadMore : undefined}
        atBottomStateChange={(bottom) => {
          if (bottom) {
            markAsRead();
          }
          if (!atTop && !bottom) setLoadingScroll("up");
          setAtBottom(bottom);
        }}
        atTopStateChange={(top) => {
          if (!atBottom && !top) setLoadingScroll("down");
          setAtTop(top);
        }}
        onScroll={(e: any) => {
          const currIndex = e.target?.scrollTop;
          if (!atTop && !atBottom) {
            setLoadingScroll(currIndex > lastIndex ? "down" : "up");
          }
          setLastIndex(currIndex);
        }}
      />
      {!atBottom && isLoadingScroll === "down" ? (
        <Flex
          position="absolute"
          bottom={isHistory ? "20px" : "76px"}
          width="full"
          justifyContent="center"
        >
          <Button
            px={2}
            leftIcon={<ArrowDownIcon boxSize="16px" />}
            borderRadius="full"
            width="154px"
            height="30px"
            colorScheme="paleBlue"
            background="paleBlue.500"
            boxShadow="base"
            color="sea.500"
            zIndex="docked"
            fontWeight="semibold"
            fontSize="sm"
            onClick={() => scrollTo("down")}
          >
            Scroll ke bawah
          </Button>
        </Flex>
      ) : null}
    </>
  );
}

type ComponentProps = {
  context?: {
    isTyping: boolean;
    topElement?: React.ReactElement;
    isHistory?: boolean;
    expireAt?: string;
    hasLoadMore?: boolean;
    verticalSpace?: {
      top?: number;
      bottom?: number;
    };
  };
};

function Header(props: ComponentProps) {
  const { topElement, hasLoadMore, verticalSpace } = props.context ?? {};
  return (
    <>
      <Box height={`${verticalSpace?.top ?? 0}px`}></Box>
      {topElement ?? null}
      {hasLoadMore ? (
        <Center paddingTop={2} paddingBottom={1.5}>
          <CircularProgress isIndeterminate size={8} color="charcoalGrey" />
        </Center>
      ) : null}
    </>
  );
}

function Footer(props: ComponentProps) {
  const { verticalSpace, isTyping, isHistory, expireAt } = props.context ?? {};

  return (
    <>
      {isTyping ? (
        <SendbirdTypingIndicator />
      ) : isHistory ? (
        <Text
          mx={7}
          py={7}
          textAlign="center"
          fontSize="xs"
          color="charcoalGrey"
        >
          Chat telah berakhir pada{" "}
          <Text as="span" d="inline" fontWeight="semibold">
            {expireAt}
          </Text>
        </Text>
      ) : null}
      <Box height={`${verticalSpace?.bottom ?? 0}px`}></Box>
    </>
  );
}
