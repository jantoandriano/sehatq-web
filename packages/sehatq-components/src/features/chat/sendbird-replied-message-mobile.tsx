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

export type SendbirdRepliedMessageMobileProps = {
  id: number;
  name: string;
  message: string;
  resetSelectedSendbirdMessage: () => void;
  gotoMessage: () => void;
  imageUrl?: string;
  imageAlt?: string;
  type: string;
};

export function SendbirdRepliedMessageMobile(
  props: SendbirdRepliedMessageMobileProps
) {
  const {
    name,
    message,
    resetSelectedSendbirdMessage,
    gotoMessage,
    imageAlt,
    imageUrl,
  } = props;
  const Image = useImage();
  return (
    <Flex
      direction="row"
      justify="space-between"
      paddingX={3}
      paddingTop={4}
      background="white"
    >
      <HStack spacing={3} onClick={gotoMessage}>
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
          <Text fontSize="xs" color="charcoalGrey">
            Balas pesan{" "}
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>
          </Text>
          <Text fontSize="xxs" color="brownGrey.500" noOfLines={1}>
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
        <ReplyMessageTypeIcon type={props.type} isMobile />
      )}
    </Flex>
  );
}
