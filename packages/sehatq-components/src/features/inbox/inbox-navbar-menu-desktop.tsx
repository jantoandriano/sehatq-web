import React from "react";
import { Flex, InboxIcon, IconButton, Box } from "../../user-interfaces";

export type InboxNavbarMenuDesktopProps = {
  inboxCounter: string;
  goToInbox: () => void;
};
export function InboxNavbarMenuDesktop(props: InboxNavbarMenuDesktopProps) {
  const { inboxCounter, goToInbox } = props;
  return (
    <IconButton
      aria-label="cart"
      variant="fit"
      onClick={goToInbox}
      icon={
        <Box as="span" position="relative">
          <InboxIcon w="30px" h="30px" />
          {inboxCounter ? (
            <Flex
              as="span"
              position="absolute"
              bg="cherry.500"
              h="18px"
              w="18px"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              fontWeight="semibold"
              fontSize="xxs"
              right="-4px"
              top="0px"
              color="white"
            >
              {inboxCounter}
            </Flex>
          ) : null}
        </Box>
      }
    />
  );
}
