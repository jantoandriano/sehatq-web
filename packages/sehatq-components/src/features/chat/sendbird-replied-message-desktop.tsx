import React from "react";
import {
  HStack,
  Text,
  Box,
  IconButton,
  CloseIcon,
  Flex,
  useImage,
} from "../../user-interfaces";
import { ReplyMessageTypeIcon } from "./sendbird-replied-message-type-icon";

export type SendbirdRepliedMessageDesktopProps = {
  id: number;
  name: string;
  message: string;
  resetSelectedSendbirdMessage: () => void;
  gotoMessage: () => void;
  imageUrl?: string;
  imageAlt?: string;
  type: string;
};

export function SendbirdRepliedMessageDesktop(
  props: SendbirdRepliedMessageDesktopProps
) {
  const {
    name,
    message,
    resetSelectedSendbirdMessage,
    gotoMessage,
    imageAlt,
    imageUrl,
    type,
  } = props;
  const Image = useImage();
  return (
    <Flex
      paddingX={5}
      paddingTop={2}
      direction="row"
      justify="space-between"
      background="white"
    >
      <HStack spacing={3} onClick={gotoMessage} cursor="pointer">
        <IconButton
          variant="fit"
          aria-label="close icon button"
          icon={
            <CloseIcon
              width="12px"
              height="12px"
              onClick={(event) => {
                event.stopPropagation();
                resetSelectedSendbirdMessage();
              }}
              color="charcoalGrey"
            />
          }
        />

        <Box flex="1">
          <Text fontSize="sm" color="charcoalGrey">
            Balas pesan{" "}
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>
          </Text>
          <Text fontSize="xs" color="brownGrey.500" noOfLines={1}>
            {message}
          </Text>
        </Box>
      </HStack>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={imageAlt ?? "reply-image"}
          layout="fill"
          objectFit="cover"
          wrapperProps={{
            width: "34px",
            height: "34px",
            borderRadius: "base",
            overflow: "hidden",
          }}
        />
      ) : (
        <ReplyMessageTypeIcon type={type} isMobile={false} />
      )}
    </Flex>
  );
}
